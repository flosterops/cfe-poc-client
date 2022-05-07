import { IPurchaseItem } from 'models/purchaseItem';
import { requestUrls } from 'helpers/requestUrls';
import { request } from 'helpers/basicAxios';
import { ISummaryItem } from 'models/purchase/ISummaryItem';

export interface PurchaseResult {
    transactionId: string;
    items: ISummaryItem[];
}

const getItemPurchase = (item: IPurchaseItem): string =>
    `<productId>${item.productId}</productId>` +
    `<quantity>${item.quantity}</quantity>` +
    `<currencyCode>${item.currencyCode}</currencyCode>`;

const getPurchaseProductBody = (accountId: number, products: IPurchaseItem[]): string =>
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<purchaseRequest version="1.2">' +
    `<recipientAccountId>${accountId}</recipientAccountId>` +
    '<purchaseItems>' +
    `${products.map((product: IPurchaseItem): string => getItemPurchase(product))}` +
    '</purchaseItems>' +
    '</purchaseRequest>';
// TODO payment method needed here
export async function purchaseProduct(
    products: IPurchaseItem[],
    channelId: string,
    token: string,
    accountId: number
): Promise<PurchaseResult> {
    const requestData = getPurchaseProductBody(accountId, products);
    const headers = { 'Content-Type': 'text/xml', 'X-GameServer-Channel': channelId, storeToken: token };

    const response = await request({
        method: 'POST',
        url: requestUrls.purchaseProduct(),
        data: requestData,
        // TODO pass [products] as params will not be present for a real request, it's here just for mock
        params: {
            products: products.map((item: IPurchaseItem): string => item.productId).join(','),
        },
        headers,
    });

    return response.data as PurchaseResult;
}
