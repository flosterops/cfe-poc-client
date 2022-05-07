import React, { FunctionComponent, ReactElement } from 'react';
import { Column, Description, Price, Row, Title } from 'ui';
import { TitleTags } from 'ui/Title';
import { colors } from 'helpers/colors';
import { FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { CurrencyPositionTypes } from 'ui/Price';
import { IAccountPaymentTransactionsModel, ISubProduct } from 'models/account';

interface Order {
    transaction: IAccountPaymentTransactionsModel;
}

const SubProducts = styled(Column)<ILayout>`
    border-bottom: 4px solid ${colors.yellow};
`;

const Order: FunctionComponent<Order> = ({ transaction }: Order): ReactElement => {
    const { date, order, transactionType, product, price, card, subProducts } = transaction;
    return (
        <Column pbottom="20px">
            <Title tagName={TitleTags.h2} mbottom="50px" fontSize={FontSizeTypes.l} weight={WeightTypes.w600}>
                Order #{order}
            </Title>
            <Column>
                <Row>
                    <Row componentWidth="230px">
                        <Description color={colors.lightPink}>Transaction Type:</Description>
                    </Row>
                    <Row>
                        <Description>{transactionType}</Description>
                    </Row>
                </Row>
                <Row mtop="15px">
                    <Row componentWidth="230px">
                        <Description color={colors.lightPink}>Purchased:</Description>
                    </Row>
                    <Row>
                        <Description>{date}</Description>
                    </Row>
                </Row>
                <Row mtop="15px">
                    <Row componentWidth="230px">
                        <Description color={colors.lightPink}>Payment method:</Description>
                    </Row>
                    <Row>
                        <Description>{card}</Description>
                    </Row>
                </Row>
                <Row mtop="70px">
                    <Row componentWidth="230px">
                        <Description color={colors.lightPink}> Product:</Description>
                    </Row>
                    <Row>
                        <Description>{product}</Description>
                    </Row>
                </Row>
                <Row>
                    <Row componentWidth="230px" />
                    <SubProducts padding="35px 0 10px 0">
                        {subProducts.map(
                            ({ id, name, quantity, price }: ISubProduct): ReactElement => {
                                return (
                                    <Row key={id}>
                                        <Row mbottom="22px" componentWidth="50%">
                                            <Description fontSize={FontSizeTypes.xs}>{name}</Description>
                                        </Row>
                                        <Row mbottom="22px" componentWidth="30%">
                                            <Description fontSize={FontSizeTypes.xs}>QTY: {quantity}</Description>
                                        </Row>
                                        <Row jc={JustifyContentTypes.flexEnd} mbottom="22px" componentWidth="20%">
                                            <Price fontSize={FontSizeTypes.xs}>{price}</Price>
                                        </Row>
                                    </Row>
                                );
                            }
                        )}
                    </SubProducts>
                </Row>
                <Row mtop="30px">
                    <Row componentWidth="230px" />
                    <Row>
                        <Row mbottom="22px" componentWidth="50%" />
                        <Column mbottom="22px" componentWidth="30%">
                            <Description fontSize={FontSizeTypes.l} weight={WeightTypes.w600}>
                                Total:
                            </Description>
                            <Description mtop="25px" fontSize={FontSizeTypes.m}>
                                Tax included if Applicable
                            </Description>
                        </Column>
                        <Row jc={JustifyContentTypes.flexEnd} mbottom="22px" componentWidth="20%">
                            <Price
                                currencyPosition={CurrencyPositionTypes.left}
                                fontSize={FontSizeTypes.l}
                                weight={WeightTypes.w600}
                            >
                                {price}
                            </Price>
                        </Row>
                    </Row>
                </Row>
            </Column>
        </Column>
    );
};

export { Order };
