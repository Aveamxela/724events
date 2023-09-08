import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
    it("a list of fields card is displayed", async () => {
        render(<Home />);
        await screen.findByText("Email");
        await screen.findByText("Nom");
        await screen.findByText("Prénom");
        await screen.findByText("Personel / Entreprise");
    });

    describe("and a click is triggered on the submit button", () => {
        it("the success message is displayed", async () => {
            render(<Home />);
            fireEvent(
                await screen.findByText("Envoyer"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );
            await screen.findByText("En cours");
            // Utilisation de waitFor pour gérer les tests
            await waitFor(() => screen.findByText("Message envoyé !"), {
                timeout: 2000,
            });
        });
    });
});

describe("When a page is created", () => {
    it("a list of events is displayed", async () => {
        render (<Home/>)
        const realisations = await screen.findByTestId("center-realisations");
        expect(realisations).toBeInTheDocument()
    });
    it("a list a people is displayed", async() => {
        const {container} = render (<Home/>)
        const peopleCard = container.querySelector(".PeopleCard");
        expect(peopleCard).toBeInTheDocument();
    });
    it("a footer is displayed", async() => {
        render (<Home/>)
        const footer = await screen.findByTestId("footer");
        expect(footer).toBeInTheDocument();
    });
    it("an event card, with the last event, is displayed", async () => {
        render (<Home/>)
        const lastEvent = await screen.findByTestId("card-testid");
         expect(lastEvent).toBeInTheDocument();
    });
});
