import React, { ReactElement } from 'react';
import { Column, ILayout, Layout } from 'ui/Layout';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { JustifyContentTypes } from 'helpers/enums';
import { options } from 'helpers/options';
import { constants } from 'helpers/constants';
import { Title, TitleTags } from 'ui/Title';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';

interface Props {
    bgUrl: string;
    name: string;
    mobileImage?: string;
}

interface IGradient extends ILayout {
    gradient: string;
}

const GameHeaderGradient = styled(Column)<IGradient>`
    background: ${(props: IGradient): string => props.gradient};
    padding: 0 35px;
    height: 275px;

    ${media.lessThan(BreakPoints.phone)} {
        padding: 0;
        height: 125px;
    }
`;

const GameHeaderBg = styled.div<{ url: string }>`
    position: absolute;
    height: 100%;
    width: 100%;
    background: url('${(props): string => props.url}') no-repeat right;
`;

const GameHeaderWrapper = styled(Layout)<ILayout>`
    max-width: ${constants.width.lgDesktop};
`;

const GameTitle = styled(Title)`
    font-size: 60px;
    ${media.lessThan(BreakPoints.phone)} {
        display: none;
    }
`;

const MobileGameImage = styled.img`
    display: none;

    ${media.lessThan(BreakPoints.phone)} {
        display: flex;
        margin-left: 15%;
        width: 60px;
    }
`;

export const GameHeader = (props: Props): ReactElement => {
    const { bgUrl, name, mobileImage } = props;

    return (
        <GameHeaderGradient
            componentWidth="100%"
            jc={JustifyContentTypes.center}
            gradient={`transparent linear-gradient(90deg, ${colors.purplePink} 0%, ${colors.dark} 100%) 0% 0% no-repeat
        padding-box;`}
        >
            <GameHeaderWrapper margin="0 auto" componentHeight="100%" jc={JustifyContentTypes.center}>
                {mobileImage && <MobileGameImage src={mobileImage} />}
                <GameTitle tagName={TitleTags.h1} padding="20px 0">
                    {name}
                </GameTitle>
                <GameHeaderBg url={`${options.cdnUrl}${bgUrl}`} />
            </GameHeaderWrapper>
        </GameHeaderGradient>
    );
};
