import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Description, Icon, Layout, Price, Row, BucketIcon } from 'ui';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import { CartItem } from 'models/CartItem';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from 'helpers/formatter/formatCurrency';
import { SelectCount } from 'widgets';
import { CurrencyPositionTypes, IPrice } from 'ui/Price';
import { capitalizeFirst } from 'helpers/capitalizeFirst';
import { IconTypes } from 'helpers/icons';

interface Props {
    item: CartItem;
    countChange: (id: string, count: number) => void;
    removeProduct: (id: string) => void;
}

const Wrapper = styled(Row)`
    background: ${colors.transparentDark};
`;

const Img = styled.img`
    width: 277px;
    height: 142px;
`;

const AdditionalInfo = styled.span`
    color: ${colors.yellow};
    font: 15px/24px;
`;

const Title = styled.h2`
    color: ${colors.lightText};
    font: 17px/27px;
    text-transform: uppercase;
`;

const StyledPrice = styled(Price)<IPrice>`
    font: normal normal bold 25px/30px;
    color: ${colors.sky};
`;

export function CartItemLayout(props: Props): ReactElement {
    const { t } = useTranslation('cart');
    const { item, countChange, removeProduct } = props;
    const defaultSelectValue = { value: item.count, label: item.count };
    return (
        <Wrapper componentHeight="190px" padding="24px" margin="11px 0">
            <Img src={item.img || undefined} alt="" />
            <Layout
                componentWidth="575px"
                componentHeight="100%"
                padding="0 24px 0 46px"
                jc={JustifyContentTypes.spaceBetween}
            >
                <Row jc={JustifyContentTypes.spaceBetween}>
                    <Layout>
                        <AdditionalInfo>{item.additionalInfo}</AdditionalInfo>
                        <Title>{item.name}</Title>
                        <Row mtop="10px" componentWidth="auto">
                            <Description fontSize={FontSizeTypes.m} color={colors.yellow}>
                                {capitalizeFirst(t('earn'))}
                                &nbsp;
                                {item.bonus}
                            </Description>
                            <Icon
                                width="25px"
                                height="25px"
                                mright="3px"
                                alt={IconTypes.glyphCoin}
                                icon={IconTypes.glyphCoin}
                            />
                        </Row>
                    </Layout>
                    <Layout componentWidth="88px">
                        <SelectCount
                            onChange={({ value }): void => countChange(item.id, value as number)}
                            defaultValue={defaultSelectValue}
                        />
                    </Layout>
                </Row>
                <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.spaceBetween}>
                    <Row componentWidth="50px" ai={AlignItemsTypes.center} onClick={(): void => removeProduct(item.id)}>
                        <BucketIcon width={14} height={14} mright="5px" />
                        <Description color="#CCCCCC">{capitalizeFirst(t('remove'))}</Description>
                    </Row>
                    <StyledPrice
                        currencyPosition={CurrencyPositionTypes.none}
                        fontSize={FontSizeTypes.l}
                        weight={WeightTypes.w600}
                    >
                        {formatCurrency(item.price, item.currencyType)}
                    </StyledPrice>
                </Row>
            </Layout>
        </Wrapper>
    );
}
