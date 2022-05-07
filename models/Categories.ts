export interface Category {
    id: string;
    name: string;
}

export interface Categories {
    categories: Category[];
}

export function createCategoriesFromResponse(data: any): Categories {
    return data as Categories;
}
