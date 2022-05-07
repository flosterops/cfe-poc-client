import { requestUrls } from 'helpers/requestUrls';
import { request } from 'helpers/basicAxios';
import { ISummaryItem } from 'models/purchase/ISummaryItem';

export interface PurchaseResult {
    result: ISummaryItem[];
    bonus: string;
    orderId: string;
    paymentMethod: string;
    date: string;
    currencyType?: string;
}

// TODO real request should use transactionId and probably channel
export async function getPurchaseData(channel: string, transactionId: string): Promise<PurchaseResult> {
    const response = await request.get(requestUrls.verifyPurchase(transactionId));
    return response.data as PurchaseResult;
}
