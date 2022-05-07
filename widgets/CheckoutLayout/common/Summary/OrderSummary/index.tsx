import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Layout, Row } from 'ui/Layout';
import { colors } from 'helpers/colors';
import { useTranslation } from 'react-i18next';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import { formatCurrency } from 'helpers/formatter/formatCurrency';
import { SummaryItem } from './SummaryItem';
import { makePlural } from 'helpers/makePlural';
import { PurchaseResult } from 'requests/getPurchaseData';
import { ISummaryItem } from 'models/purchase/ISummaryItem';

const YourOrder = styled(Layout)`
    background: ${colors.transparentDark};
`;

const Title = styled.b`
    color: ${colors.secondaryText};
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const OrderInfo = styled.span`
    color: ${colors.secondaryText};
    font-size: 16px;
    font-weight: bold;
    margin-right: 60px;
`;

const Total = styled.b`
    color: ${colors.secondaryText};
    font-size: 25px;
`;
const TaxInfo = styled.span`
    color: ${colors.secondaryText};
    font-size: 16px;
    width: 365px;
`;

const ItemsList = styled(Layout)`
    border-bottom: 2px solid ${colors.yellow};
`;

const ListSwitch = styled(Layout)`
    font-size: 13px;
    color: ${colors.yellow};
`;

interface Props {
    result: PurchaseResult;
}

export function OrderSummary({ result }: Props): ReactElement {
    const { t } = useTranslation('checkout');

    const total = result.result.reduce((prev: number, curr: ISummaryItem): number => prev + parseInt(curr.price), 0);

    // TODO ListSwitch should show and hide list, and have arrow at the end
    // TODO remove hardcoded Order Info
    return (
        <YourOrder padding="40px">
            <Title>{t('your order')}</Title>
            <Row mbottom="30px">
                <OrderInfo>{t('order id', { id: result.orderId })}</OrderInfo>
                <OrderInfo>{t('payment method', { card: result.paymentMethod })}</OrderInfo>
                <OrderInfo>{t('purchased', { date: result.date })}</OrderInfo>
            </Row>
            <ItemsList pbottom="30px">
                <ListSwitch mbottom="35px">
                    {t(makePlural(result.result.length, { single: 'item', plural: 'items' }), {
                        count: result.result.length,
                    })}
                </ListSwitch>
                {result.result.map(
                    (item: ISummaryItem): ReactElement => (
                        <SummaryItem item={item} key={item.id} />
                    )
                )}
            </ItemsList>
            <Layout ai={AlignItemsTypes.flexEnd} mtop="35px">
                <Row jc={JustifyContentTypes.spaceBetween} componentWidth="365px" mbottom="25px">
                    <Total>{t('total')}:</Total>
                    <Total>{formatCurrency(total.toString(), result.currencyType)}</Total>
                </Row>
                <TaxInfo>{t('tax included')}</TaxInfo>
            </Layout>
        </YourOrder>
    );
}
