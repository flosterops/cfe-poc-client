import axios from 'axios';
import { requestUrls } from 'helpers/requestUrls';
import { Categories, createCategoriesFromResponse } from 'models/Categories';

export async function getCategories(channel: string): Promise<Categories> {
    const data = await axios.get(requestUrls.categories(channel));
    return createCategoriesFromResponse(data.data);
}
