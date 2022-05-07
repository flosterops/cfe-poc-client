import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { Row } from 'ui';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { colors } from 'helpers/colors';

const StyledRow = styled(Row)<ILayout & { active: boolean }>`
    border-bottom: 4px solid ${(props) => (props.active ? colors.yellow : 'transparent')};
`;

interface ILightCart {
    active?: boolean;
}

const LightCart: FunctionComponent<PropsWithChildren<ILightCart>> = ({
    children,
    active = false,
}: PropsWithChildren<ILightCart>): ReactElement => {
    return (
        <StyledRow
            mbottom="25px"
            padding="0 50px 0 20px"
            ai={AlignItemsTypes.center}
            componentHeight="95px"
            jc={JustifyContentTypes.spaceBetween}
            bg="#FFFFFF12"
            active={active}
        >
            {children}
        </StyledRow>
    );
};

export { LightCart };
