import React, { ReactElement } from 'react';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import { Layout, Row } from 'ui/Layout';
import Link from 'next/link';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { useTranslation } from 'react-i18next';

const Wrapper = styled(Row)`
    background: ${colors.transparentDark};
`;
const NewBalance = styled.span`
    font-size: 25px;
    font-weight: bold;
    color: ${colors.secondaryText};
`;
const Balance = styled.span`
    font-size: 25px;
    font-weight: bold;
    color: ${colors.yellow};
`;
const BonusShopButton = styled(Layout)`
    font-size: 16px;
    font-weight: bold;
    color: ${colors.contrastToYellow};
    background: ${colors.yellow};
`;

interface Props {
    channel: string;
    bonus: string;
}

export function BalanceWrapper({ channel, bonus }: Props): ReactElement {
    const { t } = useTranslation('checkout');

    return (
        <Wrapper padding="32px" mbottom="40px" jc={JustifyContentTypes.spaceBetween} ai={AlignItemsTypes.center}>
            <Row>
                <NewBalance>{t('your new balance')}</NewBalance>
                &nbsp;
                <Balance>{bonus}</Balance>
            </Row>
            <Link
                href={{
                    pathname: '/[channel]/bonus-shop/',
                    query: { channel },
                }}
            >
                <BonusShopButton
                    componentWidth="250px"
                    componentHeight="55px"
                    jc={JustifyContentTypes.center}
                    ai={AlignItemsTypes.center}
                >
                    {t('to bonus shop')}
                </BonusShopButton>
            </Link>
        </Wrapper>
    );
}
