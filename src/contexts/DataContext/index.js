import PropTypes from "prop-types";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { act } from "react-dom/test-utils";

const DataContext = createContext({});

export const api = {
    loadData: async () => {
        const json = await fetch("/events.json");
        return json.json();
    },
};
export const DataProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const getData = useCallback(async () => {
        try {
            setData(await api.loadData());
        } catch (err) {
            // Pour résoudre une erreur, utiliser act pour préparer le composant aux assertions
            // act() permet d exécuter le test dans un environnement proche de celui de React dans le navigateur
            act(() => {
                setError(err);
            })
        }
    }, []);
    useEffect(() => {
        if (data) return;
        getData();
    });
    return (
        <DataContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                data,
                error,
            }}
            
        >
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
