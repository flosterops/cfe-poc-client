import { store } from 'stores';
import { configuredFetch } from 'helpers/configuredFetch';
import { Channels, requestUrls } from 'helpers/requestUrls';

export async function getAccountEntitlements(): Promise<any> {
    const { token } = store.getState().user;
    const headers = { 'Content-Type': 'text/xml', storeToken: token, 'X-GameServer-Channel': '1001' };
    return await configuredFetch('GET', requestUrls.accountEntitlements(Channels.commerce), '', { headers });
}
