import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { ILayout } from 'ui/Layout';
import { useTranslation } from 'react-i18next';
import { makePlural } from 'helpers/makePlural';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import { CartItemLayout } from './CartItemLayout';
import { CartItem } from 'models/CartItem';
import { connect } from 'react-redux';
import { changeProductCount, clearCart, removeProductFromCart } from 'stores/reducers/cartReducer/actions';
import { IStore } from 'stores';
import { Description, Layout, Row, BucketIcon } from 'ui';
import { capitalizeAny } from 'helpers/capitalizeFirst';

interface Props {
    channel: string;
    products: CartItem[];
    changeProductCount: (id: string, count: number) => void;
    clearCart: () => void;
    removeProductFromCart: (id: string) => void;
}

const Title = styled.h1`
    font-size: 35px;
    color: ${colors.lightText};
    text-transform: uppercase;
`;

const ItemsCount = styled(Layout)`
    line-height: 32px;
    font-size: 15px;
    color: ${colors.yellow};
`;

const ContinueShopping = styled.button`
    margin-top: 70px;
    height: 55px;
    width: 260px;
    background: ${colors.transparentDark};
    border: 2px solid ${colors.yellow};
    font: 14px/23px;
    color: ${colors.lightText};
    text-transform: uppercase;
`;

const StyledContainer = styled(Layout)<ILayout>`
    max-width: 900px;
`;

function CartItemsList(props: Props): ReactElement {
    const { products, changeProductCount, clearCart, removeProductFromCart } = props;
    const { t } = useTranslation('cart');

    const countChange = (id: string, count: number): void => changeProductCount(id, count);

    return (
        <StyledContainer>
            <Row ai={AlignItemsTypes.flexEnd} jc={JustifyContentTypes.spaceBetween}>
                <Row componentWidth="50%" ai={AlignItemsTypes.flexEnd}>
                    <Title>{t('cart')}</Title>
                    <ItemsCount pleft="10px">
                        {products.length} {t(makePlural(products.length, { single: 'item', plural: 'items' }))}
                    </ItemsCount>
                </Row>
                <Row
                    componentWidth="120px"
                    ai={AlignItemsTypes.center}
                    jc={JustifyContentTypes.flexEnd}
                    onClick={clearCart}
                    mbottom="5px"
                >
                    <BucketIcon width={14} height={14} mright="10px" />
                    <Description color="#CCCCCC">{capitalizeAny(t('empty cart'))}</Description>
                </Row>
            </Row>
            <Layout>
                {products.map(
                    (item: CartItem): ReactElement => (
                        <CartItemLayout
                            key={item.id}
                            item={item}
                            countChange={countChange}
                            removeProduct={removeProductFromCart}
                        />
                    )
                )}
            </Layout>
            <Layout ai={AlignItemsTypes.center}>
                <ContinueShopping color="#CCCCCC" onClick={(): void => alert('TBD')}>
                    {t('continue shopping')}
                </ContinueShopping>
            </Layout>
        </StyledContainer>
    );
}

const ConnectedCartItemsList = connect(({ cart }: IStore) => ({ products: cart.products }), {
    removeProductFromCart,
    changeProductCount,
    clearCart,
})(CartItemsList);

export { ConnectedCartItemsList as CartItemsList };
