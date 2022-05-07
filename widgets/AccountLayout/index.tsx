import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';
import { AccountTabIdTypes, AccountTabs } from 'widgets/AccountTabs';
import { Column, Row, Title } from 'ui';
import { ILayout } from 'ui/Layout';
import { TitleTags } from 'ui/Title';
import { constants } from 'helpers/constants';
import { AlignItemsTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import { bgGradient } from 'helpers/theme';

const AccountContainer = styled(Column)<ILayout>`
    max-width: ${constants.maxWidthWithPadding};
`;

const Gradient = styled(Column)<ILayout>`
    ${bgGradient};
    min-height: inherit;
`;

const GlyphBg = styled(Column)<ILayout>`
    background-image: url('/glyph-bg.svg');
    background-repeat-x: no-repeat;
    background-repeat-y: no-repeat;
    background-size: 50%;
    background-position-x: 50px;
`;

interface IAccountLayout {
    tabId: AccountTabIdTypes;
}

const AccountLayout: FunctionComponent<IAccountLayout> = ({
    children,
    tabId,
}: PropsWithChildren<IAccountLayout>): ReactElement => {
    return (
        <Gradient ai={AlignItemsTypes.center} componentHeight="100%" componentWidth="100%">
            <GlyphBg componentHeight="100%" ai={AlignItemsTypes.center}>
                <AccountContainer padding="0 35px" componentHeight="100%">
                    <Title
                        margin="50px 0"
                        tagName={TitleTags.h1}
                        fontSize={FontSizeTypes.xxl}
                        weight={WeightTypes.w500}
                    >
                        Account Management
                    </Title>
                    <Row>
                        <AccountTabs selectedTab={tabId} />
                        {children}
                    </Row>
                </AccountContainer>
            </GlyphBg>
        </Gradient>
    );
};

export { AccountLayout };
