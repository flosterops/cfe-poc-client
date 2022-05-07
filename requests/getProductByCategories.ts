import axios from 'axios';
import { requestUrls } from 'helpers/requestUrls';
import { createProductsByCategories, ProductsByCategoriesList } from 'models/ProductsByCategoriesList';

export async function getProductsByCategories(
    channel: string,
    categories: string[]
): Promise<ProductsByCategoriesList | null> {
    const gameData = await axios.get(requestUrls.getProductByCategories(channel, categories));
    // in mock server we have JSON, but if we will get XML from real server we need to call parseXml
    return createProductsByCategories(gameData.data);
}
