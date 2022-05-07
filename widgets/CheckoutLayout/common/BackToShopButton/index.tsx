import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from 'ui/Layout';
import Link from 'next/link';
import styled from 'styled-components';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';

const Button = styled(Layout)`
    border: 2px solid ${colors.yellow};
    text-transform: uppercase;
    color: ${colors.lightText};
    font-size: 14px;
    background: ${colors.transparentDark};
    cursor: pointer;
`;

export function BackToShopButton(): ReactElement {
    const { t } = useTranslation('checkout');
    return (
        <Link
            href={{
                pathname: '/',
            }}
        >
            <Button
                componentWidth="360px"
                componentHeight="55px"
                mtop="30px"
                jc={JustifyContentTypes.center}
                ai={AlignItemsTypes.center}
            >
                {t('back to shop')}
            </Button>
        </Link>
    );
}
