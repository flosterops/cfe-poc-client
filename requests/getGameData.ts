import axios from 'axios';
import { parseXml } from 'helpers/parseXml';
import { createGameDataFromResponse, GameData } from 'models/GameData';
import { requestUrls } from 'helpers/requestUrls';

export async function getGameData(channel: string): Promise<GameData | null> {
    try {
        const gameData = await axios.get(requestUrls.gameData(channel));
        const data = parseXml(gameData.data);
        return createGameDataFromResponse(data);
    } catch (e) {
        return null;
    }
}
