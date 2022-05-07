import React, { ReactElement } from 'react';
import { ILayout, Layout, Row } from 'ui/Layout';
import { SortDropdown } from './SortDropdown';
import { FilteredProductList } from './FilteredProductList';
import { constants } from 'helpers/constants';
import { JustifyContentTypes } from 'helpers/enums';
import { CategoryFilter } from './CategoryFilter';
import { Categories } from 'models/Categories';
import { ProductsByCategoriesList } from 'models/ProductsByCategoriesList';
import styled from 'styled-components';

interface Props {
    channel: string;
    categories: Categories;
    products: ProductsByCategoriesList;
}

const Category = styled(Layout)<ILayout>`
    width: ${constants.width.lgDesktop};
`;

export const CategoryMain = (props: Props): ReactElement => {
    const { categories, products, channel } = props;
    return (
        <Category margin="auto" padding="0 20px">
            <SortDropdown />
            <Row jc={JustifyContentTypes.spaceBetween}>
                <CategoryFilter categories={categories} channel={channel} />
                <FilteredProductList products={products} channel={channel} />
            </Row>
        </Category>
    );
};
