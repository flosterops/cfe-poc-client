import axios from 'axios';
import { parseXml } from 'helpers/parseXml';
import { requestUrls } from 'helpers/requestUrls';

export async function getProductUrl(channel: string, productName: string): Promise<any> {
    const productUrlRequest = await axios.get(requestUrls.productQuery(channel, productName));

    if (productUrlRequest.status === 200) {
        const productUrlData = parseXml(productUrlRequest.data);
        return productUrlData.browseResponse.productURL;
    }

    return null;
}
