import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
    it("a list of event card is displayed", async () => {
        render(<Form />);
        await screen.findByText("Email");
        await screen.findByText("Nom");
        await screen.findByText("Prénom");
        await screen.findByText("Personel / Entreprise");
    });

    describe("and a click is triggered on the submit button", () => {
        it("the success action is called", async () => {
            const onSuccess = jest.fn();
            render(<Form onSuccess={onSuccess} />);
            fireEvent(
                await screen.findByTestId("button-test-id"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );
            await screen.findByText("En cours");
            await waitFor(() => screen.findByText("Envoyer"),{timeout:2000}); 
            expect(onSuccess).toHaveBeenCalled();
        });
         it("the form is reset", async () => {
           const {container} = render(<Form />);
            // récupère tous les champs de texte
            const texts = screen.getAllByRole ("textbox")
            // vérifie si chaque champ a une valeur vide
            texts.forEach(text => expect (text).toHaveValue(""))
            // récupère le champ de sélection
            const select = container.querySelector(`input[name="select"]`);
            // vérifie si le champ est vide 
            expect(select).toHaveValue("")
         });
    });
    
});
