import React, { ReactElement } from 'react';
import { ILayout, Layout, Row } from 'ui/Layout';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { useTranslation } from 'react-i18next';
import { CartTotalSummary } from './CartTotalSummary';
import { CartItem } from 'models/CartItem';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import { connect } from 'react-redux';
import { IStore } from 'stores';
import { Icon } from '../../../../ui/Icon';
import { IconTypes } from '../../../../helpers/icons';

interface Props {
    channel: string;
    products: CartItem[];
}

const Title = styled.h1`
    font-size: 35px;
    color: ${colors.lightText};
    text-transform: uppercase;
`;

const ColumnItem = styled(Row)`
    background: ${colors.transparentDark};
`;

const ItemTitle = styled.span`
    font-size: 13px;
    line-height: 22px;
    color: ${colors.lightText};
`;

const Bonus = styled.span`
    font-size: 13px;
    line-height: 22px;
    color: ${colors.yellow};
`;

const Recharge = styled.a`
    font-size: 13px;
    line-height: 22px;
    color: ${colors.sky};
`;

const Container = styled(Layout)<ILayout>`
    max-width: 320px;
`;

function CartTotal(props: Props): ReactElement {
    const { products, channel } = props;
    const { t } = useTranslation('cart');

    const totalBonus = products
        .map((item: CartItem): number => item.count * Number(item.bonus))
        .reduce((memo: number, item: number): number => memo + item, 0);
    return (
        <Container componentWidth="320px">
            <Title>{t('total')}</Title>
            <CartTotalSummary products={products} channel={channel} />
            <ColumnItem
                componentHeight="60px"
                padding="0 18px"
                ai={AlignItemsTypes.center}
                jc={JustifyContentTypes.spaceBetween}
                margin="10px 0"
            >
                <ItemTitle>{t('glyphs you will earn')}</ItemTitle>
                <Row componentWidth="auto">
                    <Bonus>{totalBonus}</Bonus>
                    <Icon mleft="5px" width="25px" height="25px" alt={IconTypes.glyphCoin} icon={IconTypes.glyphCoin} />
                </Row>
            </ColumnItem>
            <ColumnItem
                componentHeight="60px"
                padding="0 18px"
                ai={AlignItemsTypes.center}
                jc={JustifyContentTypes.spaceBetween}
                margin="10px 0"
            >
                <ItemTitle>{t('not enough credits')}</ItemTitle>
                <Recharge href="">{t('recharge here')}</Recharge>
            </ColumnItem>
        </Container>
    );
}

const ConnectedCartTotal = connect(({ cart }: IStore) => ({ products: cart.products }), {})(CartTotal);

export { ConnectedCartTotal as CartTotal };
