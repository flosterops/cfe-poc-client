import React, { ReactElement } from 'react';
import { Row } from 'ui/Layout';
import { JustifyContentTypes } from 'helpers/enums';
import { ProductPreview, ProductsByCategoriesList } from 'models/ProductsByCategoriesList';
import { FilteredProduct } from './FilteredProduct';

interface Props {
    products: ProductsByCategoriesList;
    channel: string;
}

export const FilteredProductList = (props: Props): ReactElement => {
    const { products, channel } = props;
    const productList = products.categories[0].products;

    return (
        <Row componentWidth="1015px" jc={JustifyContentTypes.spaceBetween}>
            {productList.map(
                (item: ProductPreview): ReactElement => (
                    <FilteredProduct channel={channel} products={item} key={item.id} />
                )
            )}
        </Row>
    );
};
