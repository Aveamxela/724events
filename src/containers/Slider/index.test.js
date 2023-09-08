import {
    getByText,
    render,
    screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
    focus: [
        {
            title: "World economic forum",
            description:
                "Oeuvre à la coopération entre le secteur public et le privé.",
            date: "2022-02-29T20:28:45.744Z",
            cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
        },
        {
            title: "World Gaming Day",
            description: "Evenement mondial autour du gaming",
            date: "2022-03-29T20:28:45.744Z",
            cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
        },
        {
            title: "World Farming Day",
            description: "Evenement mondial autour de la ferme",
            date: "2022-01-29T20:28:45.744Z",
            cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
        },
    ],
};

describe("When slider is created", () => {
    it("a list card is displayed", async () => {
        window.console.error = jest.fn();
        api.loadData = jest.fn().mockReturnValue(data);
        render(
            <DataProvider>
                <Slider />
            </DataProvider>
        );
        await screen.findByText("World economic forum");
        await screen.findByText("janvier");
        await screen.findByText(
            "Oeuvre à la coopération entre le secteur public et le privé."
        );
    });
});
jest.setTimeout(10000);
describe("Slide change automaticaly after 5s", () => {
    it("display the next slide automaticaly", async () => {
        api.loadData = jest.fn().mockReturnValue(data);
        render(
            <DataProvider>
                <Slider />
            </DataProvider>
        );
        //  pour attendre que les données soient chargées
        await new Promise((r) => {setTimeout(r, 2000)});

        //  ici notre composant etre pret a etre testé
        const slide = document.querySelector(".SlideCard--display");
        getByText(slide, "World Farming Day");
        
        await new Promise((r) => {setTimeout(r, 4000)});
        
        const nextSlide = document.querySelector(".SlideCard--display");
        getByText(nextSlide, "World economic forum");
    });
});

describe("when bulletpoint is clicked", () => {
    it("display the next slide", async () => {
        api.loadData = jest.fn().mockReturnValue(data);
        render(
            <DataProvider>
                <Slider />
            </DataProvider>
        );
        // Récupératon de tous les boutons radios
        const bulletpoint = await screen.findAllByRole("radio");
        // Vérifier que nous sommes sur la premiere slide
        const slide = document.querySelector(".SlideCard--display");
        getByText(slide, "World Farming Day");
        // Simuler un clic sur le deuxième bouton radio
        userEvent.click(bulletpoint[1]);
        // Vérifier que nous sommes sur la deuxième slide
        const nextSlide = document.querySelector(".SlideCard--display");
        getByText(nextSlide, "World economic forum");
    });
});
