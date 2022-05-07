import { requestUrls } from 'helpers/requestUrls';
import { request } from 'helpers/basicAxios';
import { PaymentMethod } from 'models/purchase/PaymentMethod';

export interface PaymentMethodsList {
    saved: PaymentMethod[];
    another: PaymentMethod[];
}

// TODO we don't need mocked data for "Payment Methods", as we can get real one
export async function getPaymentMethods(): Promise<PaymentMethodsList> {
    const res = await request(requestUrls.paymentMethods());
    return res.data.methods as PaymentMethodsList;
}
