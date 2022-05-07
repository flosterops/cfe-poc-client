import { CartItem } from 'models/CartItem';

export const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS';
export const CHANGE_PRODUCT_COUNT = 'CHANGE_PRODUCT_COUNT';
export const CLEAR_CART = 'CLEAR_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';

export interface ISetCartProducts {
    type: typeof SET_CART_PRODUCTS;
    payload: CartItem[];
}

export interface IAddProductToCart {
    type: typeof ADD_PRODUCT_TO_CART;
    payload: CartItem[];
}

export interface IChangeProductCount {
    type: typeof CHANGE_PRODUCT_COUNT;
    payload: CartItem[];
}

export interface IClearCart {
    type: typeof CLEAR_CART;
    payload: CartItem[];
}

export interface IRemoveProductFromCart {
    type: typeof REMOVE_PRODUCT_FROM_CART;
    payload: CartItem[];
}

export interface ICartReducer {
    products: CartItem[];
}

export type CartActionTypes =
    | ISetCartProducts
    | IChangeProductCount
    | IClearCart
    | IRemoveProductFromCart
    | IAddProductToCart;
