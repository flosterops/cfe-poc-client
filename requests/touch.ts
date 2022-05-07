import { configuredFetch } from 'helpers/configuredFetch';
import { requestUrls } from 'helpers/requestUrls';

export async function touch(ticket: string): Promise<any> {
    const response = await configuredFetch('POST', requestUrls.touch(), ticket);

    if (response.status === 200) {
        return response;
    }

    return null;
}
