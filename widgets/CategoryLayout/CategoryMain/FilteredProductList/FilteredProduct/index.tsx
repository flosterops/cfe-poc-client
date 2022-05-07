import React, { ReactElement, useState } from 'react';
import { Layout, Row } from 'ui/Layout';
import { ProductPreview } from 'models/ProductsByCategoriesList';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from 'helpers/formatter/formatCurrency';
import { ComponentSizesTypes, FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import { SelectCount } from 'widgets/SelectCount';
import { ISelectOptionsModel } from 'widgets/Form/Fields/SelectSearch';
import { colors } from 'helpers/colors';
import Link from 'next/link';
import { addProductToLS } from 'helpers/addProductToLS';
import { Description } from 'ui/Description';
import { Button } from 'ui/Button';
import { Price } from '../../../../../ui/Price';

interface Props {
    products: ProductPreview;
    channel: string;
}

const Image = styled.img`
    width: 320px;
    height: 164px;
    cursor: pointer;
`;

const Main = styled(Layout)`
    width: 320px;
    height: 188px;
    background: ${colors.black};
`;

const SubTitle = styled.span`
    color: ${colors.yellow};
    font-size: 14px;
`;

const Title = styled.h2`
    color: ${colors.lightText};
    font-size: 17px;
    text-transform: uppercase;
    margin: 12px 0 6px;
`;

const Bonus = styled.span`
    color: ${colors.yellow};
    font-size: 16px;
`;

export const FilteredProduct = (props: Props): ReactElement => {
    const [count, setCount] = useState<number>(1);
    const { t } = useTranslation('categories');
    const { products, channel } = props;

    const onAddToCart = (): void => {
        addProductToLS(products.id, count);
    };
    return (
        <Layout>
            <Link
                href={{
                    pathname: '/[channel]/product/[productId]',
                    query: {
                        channel,
                        productId: products.id,
                    },
                }}
            >
                <Image src={products.img} alt="" />
            </Link>
            <Main padding="19px 15px 0">
                <SubTitle>{t('package')}</SubTitle>
                <Title>{products.name}</Title>
                <Row jc={JustifyContentTypes.spaceBetween}>
                    <Bonus>
                        {t('earn')}&nbsp;
                        {products.bonus}
                    </Bonus>
                    <Price fontSize={FontSizeTypes.m}>{formatCurrency(products.price)}</Price>
                </Row>
                <Row mtop="12px" jc={JustifyContentTypes.spaceBetween}>
                    <SelectCount onChange={({ value }: ISelectOptionsModel): void => setCount(value as number)} />
                    <Button
                        mleft="15px"
                        componentSize={ComponentSizesTypes.full}
                        color={colors.yellow}
                        onClick={onAddToCart}
                    >
                        <Description
                            color={colors.black}
                            uppercase
                            weight={WeightTypes.w600}
                            fontSize={FontSizeTypes.m}
                        >
                            {t('add to cart')}
                        </Description>
                    </Button>
                </Row>
            </Main>
        </Layout>
    );
};
