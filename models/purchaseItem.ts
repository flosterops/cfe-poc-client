import { CartItem } from './CartItem';

export interface IPurchaseItem {
    productId: string;
    quantity: number;
    // TODO add currency code types
    currencyCode: string;
}

export function cartToPurchaseItem(item: CartItem): IPurchaseItem {
    return {
        productId: item.id,
        quantity: item.count,
        // TODO currency should not be hardcoded
        currencyCode: 'USD',
    };
}
