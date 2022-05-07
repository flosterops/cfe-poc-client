import React, { ReactElement } from 'react';
import { Layout } from 'ui/Layout';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { ProgressItem } from './ProgressItem';
import { useTranslation } from 'react-i18next';

const ConnectionLine = styled.div`
    width: 1px;
    height: calc(100% - 40px);
    background: ${colors.yellow};
    margin: 20px 0 20px 20px;
    position: absolute;
`;

interface Props {
    stepIndex: number;
}

export function CheckoutProgress({ stepIndex }: Props): ReactElement {
    const { t } = useTranslation(['checkout']);

    return (
        <Layout componentWidth="180px" margin="114px 40px 114px 0">
            <ConnectionLine />
            <ProgressItem index="1" stepIndex={stepIndex} text={t('chose a payment method')} />
            <ProgressItem index="2" stepIndex={stepIndex} text={t('review your order')} margin="60px 0" />
            <ProgressItem index="3" stepIndex={stepIndex} text={t('order summary')} />
        </Layout>
    );
}
