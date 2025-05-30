import type { ReactNode } from "react";
import type { ProductProps } from "./product";

export interface State {
    basket: ProductProps[];
}

export interface Action {
    type: string;
    item?: ProductProps;
}

export interface StateContextProviderProps {
    reducer: (state: State, action: Action) => State;
    initialState: State;
    children: ReactNode;
}