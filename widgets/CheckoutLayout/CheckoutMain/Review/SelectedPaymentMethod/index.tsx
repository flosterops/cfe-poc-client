import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Layout, Row } from 'ui/Layout';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import { useTranslation } from 'react-i18next';

const Wrapper = styled(Layout)`
    background: ${colors.transparentDark};
    border-bottom: 2px solid ${colors.yellow};
    font-size: 16px;
    color: ${colors.lightText};
`;

const Checkbox = styled(Layout)`
    border-radius: 4px;
    font-size: 10px;
    color: ${colors.black};
    background: ${colors.yellow};
`;

const ChangeMethodButton = styled(Layout)`
    font-size: 14px;
    color: ${colors.yellow};
    white-space: nowrap;
    margin-right: 30px;
    cursor: pointer;
`;

interface Props {
    paymentMethod: string;
    resetMethod: () => void;
}

export function SelectedPaymentMethod({ paymentMethod, resetMethod }: Props): ReactElement {
    const { t } = useTranslation('checkout');

    // TODO we need to replace checkmark &#x2714; with SVG, also check any place where it used.
    return (
        <Wrapper componentHeight="68px" mbottom="38px" jc={JustifyContentTypes.center} ai={AlignItemsTypes.stretch}>
            <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.spaceBetween}>
                <Row ai={AlignItemsTypes.center}>
                    <Checkbox
                        componentWidth="16px"
                        componentHeight="16px"
                        margin="0 70px"
                        ai={AlignItemsTypes.center}
                        jc={JustifyContentTypes.center}
                    >
                        &#x2714;
                    </Checkbox>
                    {paymentMethod}
                </Row>
                <ChangeMethodButton componentWidth="auto" onClick={resetMethod}>
                    {t('change payment method')}
                </ChangeMethodButton>
            </Row>
        </Wrapper>
    );
}
