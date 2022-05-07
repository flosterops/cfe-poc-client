import { CoinButtonTypes } from 'helpers/coinButton';
import { IconTypes } from 'helpers/icons';
import { colors } from 'helpers/colors';

function getButtonIcon(type: CoinButtonTypes): IconTypes {
    if (type === CoinButtonTypes.binary) {
        return IconTypes.binaryCoin;
    }
    return IconTypes.glyphCoin;
}

function getButtonColor(type: CoinButtonTypes): string {
    if (type === CoinButtonTypes.binary) {
        return colors.sky;
    }
    return colors.yellow;
}

export { getButtonIcon, getButtonColor };
