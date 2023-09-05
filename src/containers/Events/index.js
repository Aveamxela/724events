import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
    const { data, error } = useData();
    const [type, setType] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    // Si un type est sélectionné alors filtrer le tableau par le type sélectionné
    const filteredEvents = (
        (!type
            ? data?.events
            : data?.events.filter((event) => event.type === type)) || []
    )
    // Trier du plus ancien au plus récent
    const byDateDesc = filteredEvents?.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    );
    const paginationEvents = byDateDesc.filter((event, index) => {
        if (
            (currentPage - 1) * PER_PAGE <= index &&
            PER_PAGE * currentPage > index
        ) {
            return true;
        }
        return false;
    });

    // modifie le type par défaut par le type sélectionné
    const changeType = (evtType) => {
        setCurrentPage(1);
        setType(evtType);
    };
    const pageNumber = Math.floor((byDateDesc?.length || 0) / PER_PAGE);
    // new Set permet de générer un tableau de valeurs uniques
    const typeList = new Set(data?.events.map((event) => event.type));
    return (
        <div data-testid="error">
            {error && <div>An error occured</div>}
            {data === null ? (
                "loading"
            ) : (
                <>
                    <h3 className="SelectTitle">Catégories</h3>
                    <Select
                        selection={Array.from(typeList)}
                        // Récupérer le type sélectionné
                        onChange={(value) =>
                            value ? changeType(value) : changeType(null)
                        }
                    />
                    <div id="events" className="ListContainer">
                        {paginationEvents.map((event) => (
                            <Modal
                                key={event.id}
                                Content={<ModalEvent event={event} />}
                            >
                                {({ setIsOpened }) => (
                                    <EventCard
                                        onClick={() => setIsOpened(true)}
                                        imageSrc={event.cover}
                                        title={event.title}
                                        date={new Date(event.date)}
                                        label={event.type}
                                    />
                                )}
                            </Modal>
                        ))}
                    </div>
                    <div className="Pagination">
                        {[...Array(pageNumber || 0)].map((_, n) => (
                            <a
                                // eslint-disable-next-line react/no-array-index-key
                                key={n}
                                href="#events"
                                onClick={() => setCurrentPage(n + 1)}
                            >
                                {n + 1}
                            </a>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default EventList;
