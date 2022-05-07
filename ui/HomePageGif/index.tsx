import React, { ReactElement } from 'react';
import { Column } from 'ui';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';

const StyledGif = styled.img`
    width: 100%;
    ${media.lessThan(BreakPoints.phone)} {
        transform: scale(1.4);
    }
`;

const GifContainer = styled(Column)<ILayout>`
    overflow: visible;
    ${media.lessThan(BreakPoints.phone)} {
        overflow: hidden;
    }
`;

const HomePageGif = (): ReactElement => {
    return (
        <GifContainer>
            <StyledGif src="/store-page-header.gif" />
        </GifContainer>
    );
};

export { HomePageGif };
