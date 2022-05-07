import React, { ReactElement } from 'react';
import { Description, IDescription } from 'ui/Description';
import { CurrencyTypes } from 'models/currency';

export enum CurrencyPositionTypes {
    none = 'none',
    left = 'left',
    right = 'right',
}

function getPrettifyPrice(position: CurrencyPositionTypes, currency: CurrencyTypes, value: string | number): string {
    if (position === CurrencyPositionTypes.left) {
        return `${currency}${value}`;
    } else if (position === CurrencyPositionTypes.right) {
        return `${value}${currency}`;
    }

    return `${value}`;
}

export interface IPrice extends IDescription {
    currencyPosition?: CurrencyPositionTypes;
    currency?: CurrencyTypes;
}

const Price = ({
    currencyPosition = CurrencyPositionTypes.right,
    currency = CurrencyTypes.default,
    children,
    ...props
}: IPrice): ReactElement => {
    const price = getPrettifyPrice(currencyPosition, currency, children as string | number);
    return <Description {...props}>{price}</Description>;
};

export { Price };
