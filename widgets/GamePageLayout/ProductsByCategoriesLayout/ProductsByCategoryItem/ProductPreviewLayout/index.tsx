import React, { ReactElement } from 'react';
import { ProductPreview } from 'models/ProductsByCategoriesList';
import { Column, Description, Icon, Layout, Price, Row, Stick, Title } from 'ui';
import { ILayout } from 'ui/Layout';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, FontSizeTypes, JustifyContentTypes } from 'helpers/enums';
import { formatCurrency } from 'helpers/formatter/formatCurrency';
import { TitleTags } from 'ui/Title';
import { IconTypes } from 'helpers/icons';
import { CurrencyPositionTypes } from 'ui/Price';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { useRouter } from 'next/router';

interface Props {
    product: ProductPreview;
    channel: string;
}

const ImageWrapper = styled(Layout)`
    background: ${colors.sky};
    overflow: hidden;
`;

const Bonus = styled.span`
    font-size: 16px;
    color: ${colors.yellow};
    margin-left: 15px;
`;

const HoveredProduct = styled(Column)<ILayout>`
    position: absolute;
    z-index: -1;
    opacity: 1;
    transition: 0.2s ease;
    &:not(:hover) {
        z-index: -1;
        opacity: 0;
    }
`;

interface IProductPreviewInfo {
    product: ProductPreview;
}

function ProductPreviewInfo({ product }: IProductPreviewInfo): ReactElement {
    const { t } = useTranslation('game-page');
    return (
        <HoveredProduct
            componentWidth="100%"
            componentHeight="100%"
            bg={colors.black}
            jc={JustifyContentTypes.spaceBetween}
            padding="20px 0 0"
        >
            <Column padding="0 10px">
                <Description color={colors.yellow} fontSize={FontSizeTypes.xs}>
                    Package
                </Description>
                <Title mtop="15px" tagName={TitleTags.h3} fontSize={FontSizeTypes.m}>
                    {product.name}
                </Title>
                <Stick color={colors.yellow} margin="10px 0 15px" />
            </Column>
            <Column padding="15px 0" bg={colors.black} jc={JustifyContentTypes.flexEnd} componentHeight="80px">
                <Row jc={JustifyContentTypes.spaceBetween}>
                    <Row ai={AlignItemsTypes.center} componentWidth="auto">
                        <Bonus>
                            {t('earn')}&nbsp;
                            {product.bonus}
                        </Bonus>
                        <Icon height="22px" mleft="5px" alt={IconTypes.glyphCoin} icon={IconTypes.glyphCoin} />
                    </Row>
                    <Price mright="15px" currencyPosition={CurrencyPositionTypes.left} fontSize={FontSizeTypes.m}>
                        {formatCurrency(product.price)}
                    </Price>
                </Row>
            </Column>
        </HoveredProduct>
    );
}

const Wrapper = styled(Layout)<ILayout>`
    max-width: 432px;
    cursor: pointer;
    width: calc(100% / 3 - 15px);
    height: 300px;
    &:hover {
        ${HoveredProduct} {
            z-index: 20;
        }
    }
    ${media.lessThan(BreakPoints.smallDesktop)} {
        width: calc(100% / 2 - 15px);
        max-width: none;
    }
    ${media.lessThan(BreakPoints.tablet)} {
        width: calc(100% / 2 - 15px);
        max-width: none;
        height: 250px;
    }
    ${media.lessThan(BreakPoints.phone)} {
        display: none;
    }
`;

const MobileWrapper = styled(Layout)<ILayout>`
    display: none;
    cursor: pointer;
    ${media.lessThan(BreakPoints.phone)} {
        display: flex;
        width: calc(100% / 2 - 7.5px);
        height: 144px;
    }
`;

const MobileImage = styled.img`
    height: 100%;
`;

// TODO should add mocked or real description to the product
export function ProductPreviewLayout(props: Props): ReactElement {
    const { product, channel } = props;
    const router = useRouter();
    const { t } = useTranslation('game-page');
    const href = {
        pathname: '/[channel]/product/[productId]',
        query: { channel, productId: product.id },
    };
    return (
        <>
            <MobileWrapper mbottom="15px" onClick={(): Promise<boolean> => router.push(href)}>
                <ImageWrapper componentHeight="100%" ai={AlignItemsTypes.center}>
                    <MobileImage src={product.img} alt="" />
                </ImageWrapper>
            </MobileWrapper>
            <Wrapper onClick={(): Promise<boolean> => router.push(href)} mbottom="20px">
                <Column componentHeight="100%">
                    <ImageWrapper ai={AlignItemsTypes.center} componentHeight="220px">
                        <img src={product.img} alt="" />
                    </ImageWrapper>
                    <Column
                        jc={JustifyContentTypes.spaceBetween}
                        padding="15px 0"
                        bg={colors.black}
                        componentHeight="80px"
                    >
                        <Title tagName={TitleTags.h3} margin="0 15px">
                            {product.name}
                        </Title>
                        <Row jc={JustifyContentTypes.spaceBetween}>
                            <Row ai={AlignItemsTypes.center} componentWidth="auto">
                                <Bonus>
                                    {t('earn')}&nbsp;
                                    {product.bonus}
                                </Bonus>
                                <Icon height="22px" mleft="5px" alt={IconTypes.glyphCoin} icon={IconTypes.glyphCoin} />
                            </Row>
                            <Price
                                mright="15px"
                                currencyPosition={CurrencyPositionTypes.none}
                                fontSize={FontSizeTypes.m}
                            >
                                {formatCurrency(product.price, product.currencyType)}
                            </Price>
                        </Row>
                    </Column>
                </Column>
                <ProductPreviewInfo product={product} />
            </Wrapper>
        </>
    );
}
