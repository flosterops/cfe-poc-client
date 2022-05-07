import { store } from 'stores';
import { configuredFetch } from 'helpers/configuredFetch';
import { requestUrls } from 'helpers/requestUrls';

export async function getUsablePaymentMethods(): Promise<any> {
    const { token } = store.getState().user;
    const headers = { 'Content-Type': 'text/xml', 'X-GameServer-Channel': '1001', storeToken: token };
    return await configuredFetch('GET', requestUrls.usablePaymentMethods(), '', { headers });
}
