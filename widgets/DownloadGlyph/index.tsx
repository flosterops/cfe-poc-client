import React, { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { Button, Description, DownloadIcon } from 'ui';
import { IButton } from 'ui/Button';
import { ComponentSizesTypes } from 'helpers/enums';
import { useTranslation } from 'react-i18next';
import { Namespaces } from 'i18n/helpers';
import { IDescription } from 'ui/Description';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';

const StyledButton = styled(Button)<IButton>`
    button {
        min-width: 120px;
        border-radius: 0;
        height: 60px;
    }
    ${media.lessThan(BreakPoints.smallDesktop)} {
        button {
            min-width: auto;
            border-radius: 0;
            height: 60px;
        }
    }
`;

export enum DownloadGlyphType {
    light = 'light',
    dark = 'dark',
}

interface IDownloadGlyph {
    type?: DownloadGlyphType;
}

const DownloadGlyphColors = {
    light: { main: colors.yellow, text: colors.dark },
    dark: { main: colors.purpleMain, text: colors.yellow },
};

const DesktopDownloadText = styled(Description)<IDescription>`
    display: flex;
    ${media.lessThan(BreakPoints.smallDesktop)} {
        display: none;
    }
`;

const TabletDownloadText = styled(Description)<IDescription>`
    display: none;
    ${media.lessThan(BreakPoints.smallDesktop)} {
        display: flex;
    }
    ${media.lessThan(BreakPoints.tablet)} {
        display: none;
    }
`;

const DownloadGlyph: FunctionComponent<IDownloadGlyph> = ({
    type = DownloadGlyphType.light,
}: IDownloadGlyph): ReactElement => {
    const { t } = useTranslation(Namespaces.common);
    const color = DownloadGlyphColors[type];

    const handleClick = (): void => {
        // TODO make download implementation
        alert('Download');
    };

    return (
        <StyledButton
            componentSize={ComponentSizesTypes.auto}
            padding="0 20px"
            color={color.main}
            onClick={handleClick}
        >
            <DownloadIcon color={color.text} />
            <DesktopDownloadText mleft="10px" color={color.text}>
                {t('installGlyph').toUpperCase()}
            </DesktopDownloadText>
            <TabletDownloadText mleft="10px" color={color.text}>
                Install
            </TabletDownloadText>
        </StyledButton>
    );
};

export { DownloadGlyph };
