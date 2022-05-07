import { Category } from './GameData';

export interface ProductPreview {
    id: string;
    name: string;
    price: string;
    bonus: string;
    currencyType: string;
    img: string;
}

export interface ProductsByCategory extends Category {
    products: ProductPreview[];
}

export interface ProductsByCategoriesList {
    categories: ProductsByCategory[];
}

export function createProductsByCategories(data: any): ProductsByCategoriesList {
    return data as ProductsByCategoriesList;
}
