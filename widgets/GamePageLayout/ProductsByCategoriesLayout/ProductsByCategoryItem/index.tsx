import React, { ReactElement } from 'react';
import { ProductPreview, ProductsByCategory } from 'models/ProductsByCategoriesList';
import { ILayout, Layout, Row } from 'ui/Layout';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { constants } from 'helpers/constants';
import { ProductPreviewLayout } from './ProductPreviewLayout';
import {
    AlignItemsTypes,
    AlignTextTypes,
    ComponentSizesTypes,
    DirectionTypes,
    FontSizeTypes,
    JustifyContentTypes,
} from 'helpers/enums';
import { ai, componentSize, direction, fontSize, jc, media, textAlign } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';

interface Props {
    category: ProductsByCategory;
    channel: string;
}

const Title = styled.h3`
    font-size: 50px;
    color: ${colors.lightText};
    letter-spacing: 3px;
    ${textAlign({ textAlign: AlignTextTypes.center })}
    ${componentSize({ componentSize: ComponentSizesTypes.full })}

    ${media.lessThan(BreakPoints.phone)} {
        ${fontSize({ fontSize: FontSizeTypes.m })}
        ${textAlign({ textAlign: AlignTextTypes.left })}
        ${componentSize({ componentSize: ComponentSizesTypes.auto })}
    }
`;

const ViewAll = styled.a`
    ${fontSize({ fontSize: FontSizeTypes.m })}
    color: ${colors.yellow};
    line-height: 24px;
    letter-spacing: 2px;
    margin: auto;
    text-transform: uppercase;
    ${media.lessThan(BreakPoints.phone)} {
        ${fontSize({ fontSize: FontSizeTypes.xs })}
        margin: 0;
        line-height: 12px;
        text-transform: none;
    }
`;

const ProductsList = styled(Row)`
    flex-wrap: wrap;
    margin-top: 50px;
    ${media.lessThan(BreakPoints.desktop)} {
        margin-top: 25px;
    }
    ${media.lessThan(BreakPoints.phone)} {
        margin-top: 15px;
    }
`;

const ProductsContainer = styled(Layout)<ILayout>`
    max-width: ${constants.width.lgDesktop};
    padding: 50px 0;
    ${media.lessThan(BreakPoints.smallDesktop)} {
        padding: 25px 0 0 0;
    }
    ${media.lessThan(BreakPoints.phone)} {
        padding: 15px 0;
    }
`;

const CategoryHeader = styled(Layout)<ILayout>`
    ${direction({ direction: DirectionTypes.column })}

    ${media.lessThan(BreakPoints.phone)} {
        ${direction({ direction: DirectionTypes.row })}
        ${jc({ jc: JustifyContentTypes.spaceBetween })}
        ${ai({ ai: AlignItemsTypes.flexEnd })}
    }
`;

export function ProductsByCategoryItem(props: Props): ReactElement {
    const { category, channel } = props;
    const { t } = useTranslation('game-page');

    return (
        <ProductsContainer margin="auto">
            <CategoryHeader>
                <Title id={category.id}>{category.name}</Title>
                <ViewAll onClick={(): void => alert('TBD')}>{t('view all')}</ViewAll>
            </CategoryHeader>
            <ProductsList jc={JustifyContentTypes.spaceBetween} ai={AlignItemsTypes.spaceBetween}>
                {category.products.map(
                    (product: ProductPreview): ReactElement => (
                        <ProductPreviewLayout channel={channel} product={product} key={product.id} />
                    )
                )}
            </ProductsList>
        </ProductsContainer>
    );
}
