import { constants } from 'helpers/constants';

export function formatCurrency(amount: string, currency: string = ''): string {
    let result = currency === constants.virtualCurrency.atlas ? amount : (Number(amount) / 100).toFixed(2);
    if (currency === 'EUR') {
        result = `€${result}`;
    } else if (currency === 'USD') {
        result = `$${result}`;
    }
    return result;
}
