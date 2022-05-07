import React, { ReactElement } from 'react';
import { Layout, Row } from 'ui/Layout';
import styled from 'styled-components';
import { formatCurrency } from 'helpers/formatter/formatCurrency';
import { useTranslation } from 'react-i18next';
import { AlignItemsTypes } from 'helpers/enums';
import { CartItem } from 'models/CartItem';

const Img = styled.img`
    flex: 1 0 auto;
    width: 110px;
    height: 56px;
`;

const Name = styled(Layout)`
    font-size: 16px;
    text-transform: uppercase;
`;

const Quantity = styled(Layout)`
    flex: 1 0 auto;
    font-size: 16px;
`;

const Price = styled(Layout)`
    font-size: 16px;
    flex: 1 0 auto;
    align-items: flex-end;
`;

interface Props {
    item: CartItem;
}

export function OrderItem({ item }: Props): ReactElement {
    const { t } = useTranslation('checkout');
    return (
        <Row ai={AlignItemsTypes.center} mbottom="20px">
            <Img src={item.img} alt={item.name} />
            <Name pleft="35px">{item.name}</Name>
            <Quantity componentWidth="180px">{t('qty', { count: item.count })}</Quantity>
            <Price componentWidth="180px">{formatCurrency(item.price, item.currencyType)}</Price>
        </Row>
    );
}
