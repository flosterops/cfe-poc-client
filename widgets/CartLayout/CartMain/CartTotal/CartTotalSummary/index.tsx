import React, { ReactElement } from 'react';
import { Layout, Price, Row } from 'ui';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { makePlural } from 'helpers/makePlural';
import { CartItem } from 'models/CartItem';
import { useTranslation } from 'react-i18next';
import { AlignItemsTypes, FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import { formatCurrency } from 'helpers/formatter/formatCurrency';
import Link from 'next/link';
import { CurrencyPositionTypes } from '../../../../../ui/Price';

interface Props {
    products: CartItem[];
    channel: string;
}

const Wrapper = styled(Layout)`
    background: ${colors.black};
`;

const ItemsCount = styled.span`
    font: 15px/24px;
    color: ${colors.gray};
    margin-bottom: 5px;
`;

const BuyNow = styled.a`
    height: 55px;
    width: 100%;
    border: none;
    background: ${colors.yellow};
    color: ${colors.contrastToYellow};
    font: bold 16px/26px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export function CartTotalSummary(props: Props): ReactElement {
    const { t } = useTranslation('cart');
    const { products, channel } = props;
    const amount = products
        .map((item: CartItem): number => item.count * Number(item.price))
        .reduce((memo: number, item: number): number => memo + item, 0);
    let currencyType = '';
    if (products.length > 0) {
        currencyType = products[0].currencyType;
    }
    return (
        <Wrapper mtop="25px" padding="20px">
            <Row ai={AlignItemsTypes.flexEnd} jc={JustifyContentTypes.spaceBetween} margin="10px 0 25px">
                <ItemsCount>
                    {products.length} {t(makePlural(products.length, { single: 'item', plural: 'items' }))}
                </ItemsCount>
                <Price
                    currencyPosition={CurrencyPositionTypes.none}
                    fontSize={FontSizeTypes.l}
                    weight={WeightTypes.w600}
                    color={colors.sky}
                >
                    {formatCurrency(amount.toString(), currencyType)}
                </Price>
            </Row>
            <Link
                href={{
                    pathname: '/[channel]/checkout',
                    query: {
                        channel,
                    },
                }}
            >
                <BuyNow>{t('buy now')}</BuyNow>
            </Link>
        </Wrapper>
    );
}
