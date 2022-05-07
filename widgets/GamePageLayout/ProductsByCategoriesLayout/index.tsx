import React, { ReactElement } from 'react';
import { ProductsByCategoriesList, ProductsByCategory } from 'models/ProductsByCategoriesList';
import { Layout } from 'ui/Layout';
import { ProductsByCategoryItem } from './ProductsByCategoryItem';

interface Props {
    productsByCategories: ProductsByCategoriesList;
    channel: string;
}

export function ProductsByCategoriesLayout(props: Props): ReactElement {
    const { productsByCategories, channel } = props;

    return (
        <Layout>
            {productsByCategories.categories.map(
                (category: ProductsByCategory): ReactElement => (
                    <ProductsByCategoryItem channel={channel} key={category.id} category={category} />
                )
            )}
        </Layout>
    );
}
