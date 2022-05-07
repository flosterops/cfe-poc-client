import axios from 'axios';
import { parseXml } from 'helpers/parseXml';

export async function getProduct(url: string): Promise<any> {
    const productRequest = await axios.get(url);

    // TODO status 200 not show that we don't have error, so we need to handle errors other way
    if (productRequest.status === 200) {
        return parseXml(productRequest.data);
    }
    return null;
}
