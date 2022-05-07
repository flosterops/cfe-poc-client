import { ILSCartModel } from 'models/cartModels';

function setCartItemsToLS(items: ILSCartModel[]): void {
    window.localStorage.setItem('cart', JSON.stringify(items));
}

function isCartExist(): boolean {
    return !!window.localStorage.getItem('cart');
}

function isProductExistInCart(id: string, cart: ILSCartModel[]): boolean {
    return !!cart.find((cartIem: ILSCartModel): boolean => cartIem.id === id);
}

function addProductToLS(id: string, count: number): void {
    if (!isCartExist()) {
        return setCartItemsToLS([{ id, count }]);
    }

    const cart = JSON.parse(window.localStorage.getItem('cart') as string) as ILSCartModel[];

    if (isProductExistInCart(id, cart)) {
        const updatedCart = cart.map(
            (cartIem: ILSCartModel): ILSCartModel => ({ ...cartIem, count: cartIem.count + count })
        );
        return setCartItemsToLS(updatedCart);
    }

    return setCartItemsToLS([...cart, { id, count }]);
}

export { addProductToLS };
