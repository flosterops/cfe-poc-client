import React, { ReactElement } from 'react';
import { Layout, Row } from 'ui/Layout';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { Summary } from 'widgets/CheckoutLayout/common/Summary';
import { AlignItemsTypes } from 'helpers/enums';
import { constants } from 'helpers/constants';
import { CheckoutProgress } from 'widgets/CheckoutLayout/common/CheckoutProgress';
import { PurchaseResult } from 'requests/getPurchaseData';

interface Props {
    channel: string;
    purchaseData: PurchaseResult;
}

// TODO as this component use common components with BuyNowLayout they should be better structured
export function PurchaseSummaryLayout(props: Props): ReactElement {
    const { channel, purchaseData } = props;
    return (
        <Layout componentWidth="100%">
            <BuyNowMain channel={channel} result={purchaseData} />
        </Layout>
    );
}

interface Props1 {
    channel: string;
    result: PurchaseResult;
}

const Wrapper = styled(Layout)`
    background: ${colors.purplePink};
    min-height: 100%;
    min-width: ${constants.width.desktop};
`;

export function BuyNowMain({ channel, result }: Props1): ReactElement {
    // TODO checking for "TWR" should be done elsewhere
    return (
        <Wrapper ai={AlignItemsTypes.center}>
            <Row componentWidth={constants.width.desktop}>
                {result.currencyType !== constants.virtualCurrency.atlas && <CheckoutProgress stepIndex={3} />}
                <Summary channel={channel} result={result} />
            </Row>
        </Wrapper>
    );
}
