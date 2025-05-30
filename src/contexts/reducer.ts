import type { Action, State } from "../types/reducer";
import type { ProductProps } from "../types/product";
export const initialState: State = {
    basket: [],
};
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            if (!action.item) return state;
            return {
                ...state,
                basket: [...state.basket, action.item as ProductProps],
            };
        case "REMOVE_FROM_BASKET":
            if (!action.item) return state;
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== (action.item as ProductProps).id),
            };
        default:
            return state;
    }
};

export default reducer;
