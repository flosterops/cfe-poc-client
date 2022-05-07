import React, { ReactElement } from 'react';
import { Column, ILayout, Layout, Row } from 'ui/Layout';
import { constants } from 'helpers/constants';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import styled from 'styled-components';
import { GameMenuItem } from './GameMenuItem';
import { useTranslation } from 'react-i18next';
import { colors } from 'helpers/colors';
import { CoinButton } from 'widgets';
import { CoinButtonTypes } from 'helpers/coinButton';
import Select from 'react-select';
import { Category } from 'models/Categories';
import { ISelectOptionsModel } from 'widgets/Form/Fields/SelectSearch';
import { useRouter } from 'next/router';
import { categoriesSelectStyles } from './categoriesSelectStyles';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { capitalizeFirst } from 'helpers/capitalizeFirst';

interface Props {
    channel: string;
    categories: Category[];
}

const Wrapper = styled(Layout)`
    background: ${colors.purplePink};
    ${media.lessThan(BreakPoints.phone)} {
        display: none;
    }
`;

const Content = styled(Row)<ILayout>`
    max-width: ${constants.width.lgDesktop};
`;

const Shop = styled(Column)<ILayout>`
    display: none;
    ${media.lessThan(BreakPoints.smallDesktop)} {
        display: flex;
    }
`;

const LinksContainer = styled(Row)<ILayout>`
    display: flex;
    ${media.lessThan(BreakPoints.smallDesktop)} {
        display: none;
    }
`;

const getShopOptions = (t: (s: string) => string): ISelectOptionsModel[] => [
    {
        value: '/[channel]/bonus-shop/',
        label: capitalizeFirst(t('bonus shop')),
    },
    {
        value: '/[channel]/patron-page/',
        label: capitalizeFirst(t('community page')),
    },
    {
        value: '/[channel]/patron-page/',
        label: capitalizeFirst(t('patron page')),
    },
];

export function GameMenu({ channel, categories }: Props): ReactElement {
    const { t } = useTranslation('game-page');
    const router = useRouter();

    const options = categories.map(
        (category: Category): ISelectOptionsModel => ({
            value: category.id,
            label: category.name,
        })
    );

    const shopOptions = getShopOptions(t);

    return (
        <Wrapper componentHeight="55px" componentWidth="100%" jc-={JustifyContentTypes.center} padding="0 35px">
            <Content
                componentHeight="100%"
                margin="auto"
                jc={JustifyContentTypes.spaceBetween}
                ai={AlignItemsTypes.center}
            >
                <Row componentWidth="auto" ai={AlignItemsTypes.center}>
                    <Select
                        options={options}
                        isSearchable={false}
                        isClearable={false}
                        styles={categoriesSelectStyles}
                        placeholder={t('categories').toLocaleUpperCase()}
                        value={null}
                        onChange={(value: any): void => {
                            const selected = value as ISelectOptionsModel;
                            router.push({
                                pathname: '/[channel]/category/[categoryId]',
                                query: {
                                    channel,
                                    categoryId: selected.value,
                                },
                            });
                        }}
                    />
                    <Shop componentWidth="auto" ai={AlignItemsTypes.center}>
                        <Select
                            options={shopOptions}
                            isSearchable={false}
                            isClearable={false}
                            styles={categoriesSelectStyles}
                            placeholder="SHOP LINKS"
                            value={null}
                            onChange={(value: any): void => {
                                const selected = value as ISelectOptionsModel;
                                router.push({
                                    pathname: selected.value as string,
                                    query: { channel },
                                });
                            }}
                        />
                    </Shop>
                    <LinksContainer componentWidth="auto" ai={AlignItemsTypes.center}>
                        <GameMenuItem
                            text={t('bonus shop')}
                            href={{
                                pathname: '/[channel]/bonus-shop/',
                                query: { channel },
                            }}
                        />
                        <GameMenuItem
                            text={t('community page')}
                            href={{
                                pathname: '/[channel]/patron-page/',
                                query: { channel },
                            }}
                        />
                        <GameMenuItem
                            text={t('patron page')}
                            href={{
                                pathname: '/[channel]/patron-page/',
                                query: { channel },
                            }}
                        />
                    </LinksContainer>
                </Row>
                <Row componentWidth="auto" componentHeight="100%">
                    <Row componentWidth="auto" mright="30px">
                        <CoinButton type={CoinButtonTypes.glyph} />
                    </Row>
                    <CoinButton type={CoinButtonTypes.binary} />
                </Row>
            </Content>
        </Wrapper>
    );
}
