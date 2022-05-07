import { request } from 'helpers/basicAxios';
import { requestUrls } from 'helpers/requestUrls';
import { CartData } from 'models/CartItem';

export async function getCartProducts(channel: string): Promise<CartData | null> {
    // TODO should add storeToken as request param
    const response = await request.get(requestUrls.cart(channel));
    if (response.status === 200) {
        return response.data;
    }
    return null;
}
