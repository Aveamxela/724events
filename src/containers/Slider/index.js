import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
    const { data } = useData();
    const [index, setIndex] = useState(0);
    const byDateDesc = data?.focus.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    );
    // Initialisation de time
    let time = null;
    // gère le changement automatique de diapositive
    const nextCard = () => {
        // Vérifie si byDateDesc existe
        if (byDateDesc) {
            // setTimeout est utilisé pour planifier une action après un délai de 5s
            // Ajout de - 1 pour que l'index corresponde toujours à un element du tableau
            time = setTimeout(
                () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
                5000
            );
        }
    };
    // Exécuté à chaque rendu du composant
    useEffect(() => {
        // renitialisation du délai - garantit les 5s depuis la dernière interaction
        clearTimeout(time);
        nextCard();
    });
    // changement de la slide en fonction du bouton radio cliqué
    const changeSlide = (event) => {
        setIndex(event);
    };

    return (
        <div className="SlideCardList">
            {byDateDesc?.map((event, idx) => (
                <div
                    key={event.title}
                    className={`SlideCard SlideCard--${
                        index === idx ? "display" : "hide"
                    }`}
                >
                    <img src={event.cover} alt="forum" />
                    <div className="SlideCard__descriptionContainer">
                        <div className="SlideCard__description">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <div>{getMonth(new Date(event.date))}</div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="SlideCard__paginationContainer">
                <div className="SlideCard__pagination">
                  {/* chaque bouton radio est associé à une diapositive */}
                    {byDateDesc?.map((event, radioIdx) => (
                        <input
                            // Ajout de -pagination pour avoir une clé unique
                            key={`${event.title}-pagination`}
                            type="radio"
                            name="radio-button"
                            // Au clic sur le bouton radio afficher la slide associée au bouton
                            onChange={() => changeSlide(radioIdx)}
                            // Vérifie si l'idx du bouton correspond à l'idx de la diapositive associée
                            checked={index === radioIdx}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;
