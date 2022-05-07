export interface Category {
    name: string;
    id: string;
}

export interface GameData {
    headerBackground: string;
    name: string;
    categories: Category[];
    purchaseType: PurchaseType;
}

export enum PurchaseType {
    buyNow,
    cart,
    fastBuy,
}

export function createGameDataFromResponse(data: any): GameData {
    const response = data.productResponse;
    let purchaseType = PurchaseType.buyNow;
    if (response.purchase === 'cart') {
        purchaseType = PurchaseType.cart;
    }

    const categories = response.categories.category.map(
        (category: any): Category => ({
            name: category['#text'],
            id: category.attr.id,
        })
    );

    return {
        headerBackground: response.header_background,
        name: response.name,
        categories,
        purchaseType,
    };
}
