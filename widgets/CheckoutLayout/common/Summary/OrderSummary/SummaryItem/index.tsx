import React, { ReactElement } from 'react';
import { Layout, Row } from 'ui/Layout';
import { formatCurrency } from 'helpers/formatter/formatCurrency';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { ISummaryItem } from 'models/purchase/ISummaryItem';

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

const Wrapper = styled(Row)`
    color: ${colors.secondaryText};
`;

interface Props {
    item: ISummaryItem;
}

export function SummaryItem({ item }: Props): ReactElement {
    const { t } = useTranslation('checkout');

    return (
        <Wrapper mbottom="20px">
            <Name>{item.name}</Name>
            <Quantity componentWidth="180px">{t('qty', { count: item.quantity })}</Quantity>
            <Price componentWidth="180px">{formatCurrency(item.price, item.currencyType)}</Price>
        </Wrapper>
    );
}
