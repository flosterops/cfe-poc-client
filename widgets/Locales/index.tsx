import React, { FunctionComponent, ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { Column, Description, Icon, Layout, Row } from 'ui';
import { LocaleArrow } from 'widgets/Locales/LocaleArrow';
import { getLocalesBg } from 'widgets/Locales/helpers';
import { AlignItemsTypes, DirectionTypes, JustifyContentTypes } from 'helpers/enums';
import { IconTypes } from 'helpers/icons';
import { IDescription } from 'ui/Description';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { IIcon } from 'ui/Icon';
import { ILayout } from 'ui/Layout';
import { useOnClickOutside } from 'helpers/useOnClickOutside';
import { colors } from 'helpers/colors';
import locales from './config.json';

import i18next from 'i18n';

const { i18n } = i18next;

interface ILocalesText extends IDescription {
    short: boolean;
}

const LocalesText = styled(Description)<ILocalesText>`
    display: ${({ short }: ILocalesText): string => (short ? 'none' : 'flex')};
`;

const StyledLocales = styled(Layout)<ILayout>`
    height: 60px;
    margin: 0 20px;
    padding: 0 7px;
    cursor: pointer;
    ${media.lessThan(BreakPoints.desktop)} {
        margin: 0 10px;
    }
`;

const LocaleIcon = styled(Icon)<IIcon>`
    ${media.lessThan(BreakPoints.phone)} {
        width: 18px;
        height: 18px;
    }
`;

const Languages = styled(Column)<ILayout>`
    position: absolute;
    z-index: 5;
    top: 60px;
    left: 0;
`;

const SelectLanguage = styled(Row)<ILayout>`
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

interface ILocales {
    short?: boolean;
    footer?: boolean;
}

const Locales: FunctionComponent<ILocales> = ({ short = true, footer = false }: ILocales): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const ref = useRef(null);
    useOnClickOutside(ref, (): void => setVisible(false));

    const changeLocale = async (locale: string): Promise<void> => {
        await i18n.changeLanguage(locale);
        setVisible(false);
    };

    const localesBg = getLocalesBg(visible, footer);
    return (
        <StyledLocales
            bg={localesBg}
            ai={AlignItemsTypes.center}
            componentWidth="auto"
            onClick={(): void => setVisible(!visible)}
            layoutRef={ref}
            direction={DirectionTypes.row}
        >
            <LocaleIcon alt="locale" icon={IconTypes.languages} />
            {!short && (
                <LocalesText short={short} margin="0 15px 0 10px" uppercase>
                    languages
                </LocalesText>
            )}
            <LocaleArrow short={short} />
            {visible && (
                <Languages bg={colors.dark} ptop="20px">
                    {locales.map(
                        (locale: string): ReactElement => {
                            const selected = i18n.language === locale;
                            const color = selected ? colors.yellow : colors.lightText;

                            return (
                                <SelectLanguage
                                    key={locale}
                                    mbottom="30px"
                                    jc={JustifyContentTypes.center}
                                    ai={AlignItemsTypes.center}
                                    onClick={(): Promise<void> => changeLocale(locale)}
                                >
                                    <Description color={color} uppercase>
                                        {locale}
                                    </Description>
                                </SelectLanguage>
                            );
                        }
                    )}
                </Languages>
            )}
        </StyledLocales>
    );
};

export { Locales };
