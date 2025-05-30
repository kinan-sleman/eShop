import { createContext, useContext, useReducer, type Dispatch } from "react";
import type { State, Action, StateContextProviderProps } from '../types/reducer';
import type { ProductProps } from "../types/product";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stateContext = createContext<[State, Dispatch<Action>] | undefined>(undefined);

export const getBasketTotal = (basket: ProductProps[]) => {
    return basket.reduce((amount, item) => item.price + amount, 0)
}

export const StateContextProvider = ({
    reducer,
    initialState,
    children
}: StateContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <stateContext.Provider value={[state, dispatch]}>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </stateContext.Provider>
    )
};

export const useStateContext = () => {
    const context = useContext(stateContext);
    if (context === undefined) {
        throw new Error('useStateContext must be used within a StateContextProvider');
    }
    return context;
};
