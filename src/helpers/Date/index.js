export const MONTHS = {
    1: "janvier",
    2: "février",
    3: "mars",
    4: "avril",
    5: "mai",
    6: "juin",
    7: "juillet",
    8: "août",
    9: "septembre",
    10: "octobre",
    11: "novembre",
    12: "décembre",
};

export const getMonth = (date) => {
    // Obtient le n° du mois (0 à 11), + 1 pour obtenir le n° réel du mois
    const monthNumber = date.getMonth() + 1;
    // Utilise le numéro pour accéder à l'élement correspondant
    const monthName = MONTHS[monthNumber];
    // Retourne le nom du mois
    return monthName;
};
