import { request } from 'helpers/basicAxios';
import { requestUrls } from 'helpers/requestUrls';
import { IGame } from 'models/game';

async function getChannels(): Promise<IGame[] | null> {
    const response = await request.get(requestUrls.channels());
    if (response.status === 200) {
        return response.data.channels;
    }

    return null;
}

export { getChannels };
