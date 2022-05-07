import React, { FunctionComponent, ReactElement } from 'react';
import { Column } from 'ui';
import { AlignItemsTypes } from 'helpers/enums';

export interface IProductImage {
    Image: FunctionComponent<{}> | null;
}

const ProductImage: FunctionComponent<IProductImage> = ({ Image }: IProductImage): ReactElement | null => {
    if (!Image) {
        return null;
    }

    return <Column ai={AlignItemsTypes.center}>{Image}</Column>;
};

export { ProductImage };
