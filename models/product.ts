import { Html5Entities } from 'html-entities';
import { getElementByAttr } from 'helpers/api_adaptor';
import { constants } from 'helpers/constants';

export interface Product {
    button: string;
    description: string;
    name: string;
    price: string;
    legal: string;
    rawPrice: string;
    img: string | null;
    currencyType: string;
}

const decoder = new Html5Entities();

export function createProductFromResponse(response: any): Product | null {
    const metadata = response.productResponse.product.productMetadata.metadata;
    const upgradeButton = getElementByAttr(metadata, 'code', 'UPGRADE_BUTTON');
    const upgradeDescription = getElementByAttr(metadata, 'code', 'DESCRIPTION');
    const legalText = getElementByAttr(metadata, 'code', 'LEGAL_TEXT');
    const upgradeName = getElementByAttr(metadata, 'code', 'UPGRADE_NAME');
    const button = getElementByAttr(upgradeButton.details.detail, 'locale', 'en');
    const description = getElementByAttr(upgradeDescription.details.detail, 'locale', 'en');
    const name = getElementByAttr(upgradeName.details.detail, 'locale', 'en');
    const legal = getElementByAttr(legalText.details.detail, 'locale', 'en');
    const priceData = response.productResponse.product.prices.price;
    let price = '';
    let currencyType = '';
    if (Array.isArray(priceData)) {
        price = getElementByAttr(priceData, 'currencyType', 'EUR').finalPrice;
        currencyType = 'EUR';
    } else {
        price = priceData.finalPrice;
        currencyType = constants.virtualCurrency.atlas;
    }
    const img = response.productResponse.product.contents.content.url || null;
    return {
        button: button.detailValue,
        legal: decoder.decode(legal.detailValue),
        description: decoder.decode(description.detailValue),
        name: name.detailValue,
        price: (Number(price) / 100).toFixed(2),
        rawPrice: price,
        currencyType,
        img,
    };
}
