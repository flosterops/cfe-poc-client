import React, { ReactElement } from 'react';
import { Product } from 'models/product';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, DirectionTypes, FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import { Column, Container, Description, Icon, Row, Stick, Title } from 'ui';
import { ITitle, TitleTags } from 'ui/Title';
import { IDescription } from 'ui/Description';
import { IconTypes } from 'helpers/icons';
import { ai, direction, fontSize, media } from 'helpers/theme';
import { Category, PurchaseType } from 'models/GameData';
import { getProductLayoutFromParser } from 'widgets/ProductLayout/helpers';
import { ProductIncludes } from 'widgets/ProductLayout/ProductIncludes';
import { ProductImage } from 'widgets/ProductLayout/ProductImage';
import { ProductDescription } from 'widgets/ProductLayout/ProductDescription';
import { TopCategories } from 'widgets/GamePageLayout/TopCategories';
import { PurchaseButton } from 'widgets';
import { formatCurrency } from 'helpers/formatter/formatCurrency';
import { ILayout } from 'ui/Layout';
import { BreakPoints } from 'helpers/responsive';
import { IContainer } from 'ui/Container';
import { IIcon } from 'ui/Icon';

interface IItemCart {
    id: string;
    name: string;
    originPrice?: number;
    rawPrice: string;
    currency: string;
    earn: number;
    descriptions?: string[] | null;
    setModalMessage: () => void;
    channel: string;
    purchaseType: PurchaseType;
}

const StyledOriginPrice = styled(Description)<IDescription>`
    text-decoration: line-through;
`;

const StyledItemCart = styled(Column)<ILayout>`
    width: 320px;
    ${media.lessThan(BreakPoints.phone)} {
        width: 100%;
    }
`;

const StyledItemCartFooter = styled(Column)<ILayout>`
    ${media.lessThan(BreakPoints.phone)} {
        display: none;
    }
`;

const GlyphCoin = styled(Icon)<IIcon>`
    ${media.lessThan(BreakPoints.phone)} {
        width: 23px;
    }
`;

const ItemCart = ({
    id,
    name,
    originPrice,
    rawPrice,
    currency,
    earn,
    descriptions,
    setModalMessage,
    channel,
    purchaseType,
}: IItemCart): ReactElement => {
    return (
        <StyledItemCart>
            <Description fontSize={FontSizeTypes.xs} color={colors.yellow} mbottom="10px">
                Package
            </Description>
            <Title tagName={TitleTags.h1} uppercase fontSize={FontSizeTypes.m} weight={WeightTypes.w600}>
                {name}
            </Title>
            <Stick color={colors.yellow} mtop="15px" />
            <Row ai={AlignItemsTypes.center} margin="20px 0">
                <Description color={colors.yellow}>Earn {earn}</Description>
                <GlyphCoin alt={IconTypes.glyphCoin} icon={IconTypes.glyphCoin} />
            </Row>
            {descriptions?.map(
                (description: string): ReactElement => {
                    return (
                        <Description key={Math.random() * 1000} fontSize={FontSizeTypes.xs}>
                            {description}
                        </Description>
                    );
                }
            )}

            <StyledItemCartFooter bg={colors.black} mtop="20px">
                <Row
                    padding="15px 15px 8px"
                    ai={AlignItemsTypes.center}
                    jc={JustifyContentTypes.spaceBetween}
                    componentWidth="320px"
                >
                    <Row componentWidth="auto" ai={AlignItemsTypes.center}>
                        <Description color={colors.sky} fontSize={FontSizeTypes.m}>
                            {formatCurrency(rawPrice, currency)}
                        </Description>
                        {originPrice && (
                            <StyledOriginPrice mleft="5px" color={colors.darkText}>
                                {originPrice}
                            </StyledOriginPrice>
                        )}
                    </Row>
                </Row>
                <Stick color={colors.sky} />
                <PurchaseButton
                    channel={channel}
                    id={id}
                    purchaseType={purchaseType}
                    setModalMessage={setModalMessage}
                />
            </StyledItemCartFooter>
        </StyledItemCart>
    );
};

interface Props {
    product: Product | null;
    productId: string;
    categories: Category[];
    setModalMessage: () => void;
    channel: string;
    purchaseType: PurchaseType;
}

const StyledProductDescription = styled(Column)<any>`
    color: ${colors.lightText};
    & ul {
        column-count: 2;
        column-gap: 30px;
        list-style-type: '-';
        & li {
            padding-left: 5px;
            ${fontSize({ fontSize: FontSizeTypes.xs })}
        }
    }
    ${media.lessThan(BreakPoints.phone)} {
        & ul {
            width: 100%;
            column-count: 1;
            list-style-type: none;
            & li {
                padding-left: 0;
                ${fontSize({ fontSize: FontSizeTypes.xs })}
                text-transform: uppercase;
            }
        }
    }
`;

const ProductContainer = styled(Container)<IContainer>`
    padding: 50px 0;
    ${media.lessThan(BreakPoints.phone)} {
        padding: 20px 0;
    }
`;

const ProductContent = styled(Row)<ILayout>`
    ${direction({ direction: DirectionTypes.row })}
    padding:0 35px;
    ${media.lessThan(BreakPoints.phone)} {
        ${direction({ direction: DirectionTypes.column })}
        padding: 20px 15px 0;
    }
`;

const DesktopImage = styled(Row)<ILayout>`
    ${media.lessThan(BreakPoints.phone)} {
        display: none;
    }
`;

const MobileImage = styled(Row)<ILayout>`
    display: none;
    ${media.lessThan(BreakPoints.phone)} {
        display: flex;
        & div img {
            width: 100%;
        }
    }
`;

const ProductDescriptionContainer = styled(Column)<ILayout>`
    padding: 0 0 0 150px;
    ${ai({ ai: AlignItemsTypes.center })}
    ${media.lessThan(BreakPoints.phone)} {
        padding: 0;
        ${ai({ ai: AlignItemsTypes.flexStart })}
    }
`;

const ProductDescriptionItem = styled(Row)<ILayout>`
    margin-top: 40px;
    ${media.lessThan(BreakPoints.phone)} {
        margin-top: 20px;
    }
`;

const CategoriesTitle = styled(Title)<ITitle>`
    ${media.lessThan(BreakPoints.phone)} {
        ${fontSize({ fontSize: FontSizeTypes.l })}
    }
`;

const CategoriesContainer = styled(Container)<IContainer>`
    background: ${colors.purpleMain};
    ${media.lessThan(BreakPoints.phone)} {
        background: ${colors.dark};
    }
`;

const CategoriesRow = styled(Row)<ILayout>`
    padding: 40px 0;
    ${media.lessThan(BreakPoints.phone)} {
        padding: 10px 15px;
    }
`;

const StyledCategoriesLinksContainer = styled(Container)<IContainer>`
    padding: 40px 35px;
    ${media.lessThan(BreakPoints.phone)} {
        padding: 0 15px 20px 15px;
    }
`;

export function ProductLayout({
    product,
    productId,
    categories,
    setModalMessage,
    channel,
    purchaseType,
}: Props): ReactElement {
    // TODO remove into product set up
    if (!product || !product.description) {
        return <>error</>;
    }

    const { name, rawPrice, description, currencyType } = product;
    const productComponents = getProductLayoutFromParser(description);
    const Image = productComponents ? productComponents.ProductImage : null;
    const Includes = productComponents ? productComponents.ProductIncludes : null;
    const descriptions = productComponents ? productComponents.ProductDescriptionElements : null;
    return (
        <>
            <ProductContainer>
                <MobileImage>
                    <ProductImage Image={Image} />
                </MobileImage>
                <ProductContent>
                    <ItemCart
                        id={productId}
                        setModalMessage={setModalMessage}
                        descriptions={descriptions}
                        name={name}
                        rawPrice={rawPrice}
                        currency={currencyType}
                        earn={50}
                        channel={channel}
                        purchaseType={purchaseType}
                    />
                    <ProductDescriptionContainer>
                        <StyledProductDescription ai={AlignItemsTypes.center}>
                            <DesktopImage>
                                <ProductImage Image={Image} />
                            </DesktopImage>
                            <ProductDescriptionItem mtop="40px">
                                <ProductIncludes Includes={Includes} />
                            </ProductDescriptionItem>
                            <ProductDescriptionItem mtop="40px">
                                <ProductDescription descriptions={descriptions} />
                            </ProductDescriptionItem>
                        </StyledProductDescription>
                    </ProductDescriptionContainer>
                </ProductContent>
            </ProductContainer>
            <CategoriesContainer>
                <CategoriesRow jc={JustifyContentTypes.center}>
                    <CategoriesTitle
                        tagName={TitleTags.h1}
                        fontSize={FontSizeTypes.xxl}
                        weight={WeightTypes.w600}
                        uppercase
                    >
                        top categories
                    </CategoriesTitle>
                </CategoriesRow>
            </CategoriesContainer>
            <StyledCategoriesLinksContainer>
                <TopCategories title={false} channel={channel} topCategories={categories} />
            </StyledCategoriesLinksContainer>
        </>
    );
}
