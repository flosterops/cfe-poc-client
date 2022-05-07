import {
    ADD_PRODUCT_TO_CART,
    CHANGE_PRODUCT_COUNT,
    CLEAR_CART,
    IAddProductToCart,
    IChangeProductCount,
    IClearCart,
    IRemoveProductFromCart,
    ISetCartProducts,
    REMOVE_PRODUCT_FROM_CART,
    SET_CART_PRODUCTS,
} from './types';
import { CartItem } from 'models/CartItem';
import { store } from 'stores';
import { request } from 'helpers/basicAxios';
import { AxiosResponse } from 'axios';

export const setCartProducts = (products: CartItem[]) => (dispatch: (action: ISetCartProducts) => void) => {
    dispatch({
        type: SET_CART_PRODUCTS,
        payload: products || [],
    });
};

export const changeProductCount = (id: string, count: number) => (dispatch: (action: IChangeProductCount) => void) => {
    const { products } = store.getState().cart;
    const updatedProducts = products.map(
        (cartItem: CartItem): CartItem => {
            if (cartItem.id === id) {
                return { ...cartItem, count };
            }
            return cartItem;
        }
    );
    dispatch({
        type: CHANGE_PRODUCT_COUNT,
        payload: updatedProducts || [],
    });
};

export const clearCart = () => (dispatch: (action: IClearCart) => void) => {
    dispatch({
        type: CLEAR_CART,
        payload: [],
    });
};

export const addProductToCart = (id: string, count: number) => async (
    dispatch: (action: IAddProductToCart) => void
) => {
    const { products } = store.getState().cart;
    const hasInCart = products.some((product: CartItem): boolean => product.id === id);

    if (hasInCart) {
        const updatedProducts = products.map(
            (product: CartItem): CartItem => {
                if (product.id === id) {
                    return { ...product, count: product.count + count };
                }
                return product;
            }
        );
        return dispatch({
            type: ADD_PRODUCT_TO_CART,
            payload: updatedProducts,
        });
    }

    const response = (await request.get('/mocks/cart.json')) as AxiosResponse<CartItem[]>;
    const product = response.data.find((product: CartItem): boolean => product.id === id) as CartItem;
    dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: [...products, product],
    });
};

export const removeProductFromCart = (id: string) => (dispatch: (action: IRemoveProductFromCart) => void) => {
    const { products } = store.getState().cart;
    const filteredProducts = products.filter((product: CartItem) => product.id !== id);
    dispatch({
        type: REMOVE_PRODUCT_FROM_CART,
        payload: filteredProducts,
    });
};
