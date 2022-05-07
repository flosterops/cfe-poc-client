export interface CartItem {
    code: string;
    id: string;
    img: string;
    additionalInfo: string;
    name: string;
    bonus: string;
    price: string;
    count: number;
    currencyType: string;
}

export interface CartData {
    products: CartItem[];
}
