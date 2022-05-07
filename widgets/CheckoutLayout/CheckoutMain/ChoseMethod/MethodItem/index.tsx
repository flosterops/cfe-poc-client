import React, { ReactElement } from 'react';
import { Layout, Row } from 'ui/Layout';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import { Checkbox } from 'widgets/CheckoutLayout/common/Checkbox';
import { useTranslation } from 'react-i18next';
import { PaymentMethod } from 'models/purchase/PaymentMethod';
import { SelectedMethod } from 'models/purchase/SelectedMethod';

const Wrapper = styled(Layout)`
    background: ${colors.transparentDark};
    border-bottom: 2px solid transparent;
    font-size: 16px;
    color: ${colors.lightText};
    text-transform: uppercase;
    cursor: pointer;
    :hover {
        background: ${colors.dark}44;
        border-bottom: 2px solid ${colors.yellow};
    }
`;

const Button = styled.button`
    height: 45px;
    background: ${colors.yellow};
    font-size: 14px;
    font-weight: bold;
    color: ${colors.contrastToYellow};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin-right: 16px;
    text-transform: uppercase;
    white-space: nowrap;
    padding: 0 28px;
    cursor: pointer;
`;

interface Props {
    method: PaymentMethod;
    setMethod: (method: SelectedMethod) => void;
    isChecked: boolean;
    check: () => void;
}

// TODO should we have different components for different methods, like card should have form for card info
export function MethodItem({ method, setMethod, check, isChecked }: Props): ReactElement {
    const { t } = useTranslation('checkout');
    return (
        <Wrapper componentHeight="68px" mbottom="8px" jc={JustifyContentTypes.center} onClick={check}>
            <Row ai={AlignItemsTypes.center}>
                <Layout componentWidth="16px" margin="0 70px">
                    <Checkbox value={isChecked} change={check} />
                </Layout>
                <Layout>{method.name}</Layout>
                {isChecked && <Button onClick={(): void => setMethod(method)}>{t('proceed')}</Button>}
            </Row>
        </Wrapper>
    );
}
