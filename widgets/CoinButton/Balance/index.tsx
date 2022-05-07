import styled from 'styled-components';
import { Description, IDescription } from 'ui/Description';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import React, { ReactElement } from 'react';
import { FontSizeTypes, WeightTypes } from 'helpers/enums';

const StyledBalance = styled(Description)<IDescription>`
    ${media.lessThan(BreakPoints.desktop)} {
        display: none;
    }
`;

interface IBalance {
    balance?: number;
    color: string;
}

function Balance({ balance, color }: IBalance): ReactElement {
    if (!balance) {
        return (
            <>
                <Description uppercase fontSize={FontSizeTypes.m} weight={WeightTypes.w400} mright="3px">
                    add
                </Description>
                <StyledBalance uppercase fontSize={FontSizeTypes.m} weight={WeightTypes.w400} color={color}>
                    balance
                </StyledBalance>
            </>
        );
    }
    return (
        <Description uppercase fontSize={FontSizeTypes.m} weight={WeightTypes.w400} color={color}>
            {balance}
        </Description>
    );
}

export { Balance };
