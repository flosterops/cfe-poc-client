import React, { ReactElement } from 'react';
import { Title } from 'widgets/CheckoutLayout/common/Title';
import { useTranslation } from 'react-i18next';
import { Layout } from 'ui/Layout';
import { BackToShopButton } from 'widgets/CheckoutLayout/common/BackToShopButton';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { BalanceWrapper } from './BalanceWrapper';
import { OrderSummary } from './OrderSummary';
import { ReceivedList } from './ReceivedList';
import { PurchaseResult } from 'requests/getPurchaseData';

const SubTitle = styled.h2`
    font-size: 25px;
    color: ${colors.lightText};
    margin: 87px 0 30px 0;
`;

interface Props {
    channel: string;
    result: PurchaseResult;
}

export function Summary({ channel, result }: Props): ReactElement {
    const { t } = useTranslation('checkout');

    // TODO remove balance placeholder
    return (
        <Layout pbottom="60px">
            <Title>{t('purchase successful')}</Title>
            <OrderSummary result={result} />
            <SubTitle>{t('your purchase was successful')}</SubTitle>
            <BalanceWrapper channel={channel} bonus={result.bonus} />
            <ReceivedList itemList={result} />
            <BackToShopButton />
        </Layout>
    );
}
