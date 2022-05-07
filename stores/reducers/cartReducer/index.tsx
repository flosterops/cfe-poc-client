import {
    ADD_PRODUCT_TO_CART,
    CartActionTypes,
    CHANGE_PRODUCT_COUNT,
    CLEAR_CART,
    ICartReducer,
    REMOVE_PRODUCT_FROM_CART,
    SET_CART_PRODUCTS,
} from './types';

const initialState: ICartReducer = {
    products: [],
};

export function cartReducer(state: ICartReducer = initialState, action: CartActionTypes): ICartReducer {
    switch (action.type) {
        case CHANGE_PRODUCT_COUNT:
        case CLEAR_CART:
        case REMOVE_PRODUCT_FROM_CART:
        case SET_CART_PRODUCTS:
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                products: action.payload,
            };
        default:
            return { ...state };
    }
}
