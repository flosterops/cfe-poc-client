import { configuredFetch } from 'helpers/configuredFetch';
import { requestUrls } from 'helpers/requestUrls';
import { store } from 'stores';

export async function getTieredPaymentTypes(): Promise<any> {
    const { token } = store.getState().user;
    const { accountId } = store.getState().user.account;
    const headers = { 'X-GameServer-Channel': '1001', storeToken: token, 'Content-Type': 'text/xml' };
    return await configuredFetch('GET', requestUrls.tieredPaymentTypes(accountId), '', { headers });
}
