import React, { ReactElement } from 'react';
import { Column, Description, Price, Row } from 'ui';
import { Field, Form, Pagination } from 'widgets';
import { selectStyles } from 'widgets/Form/Fields/SelectSearch/helpers';
import { AlignItemsTypes, ComponentSizesTypes, JustifyContentTypes } from 'helpers/enums';
import { StyledTable, StyledTbody, StyledTd, StyledTh, StyledThead, StyledTr } from 'ui/Table';
import options from './options.json';
import { colors } from 'helpers/colors';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { IAccountPaymentTransactionsModel } from 'models/account';
import { CurrencyPositionTypes } from 'ui/Price';

const Panel = (): ReactElement => {
    return (
        <Form initialValues={{}}>
            {(): ReactElement => {
                return (
                    <Row margin="30px 0" ai={AlignItemsTypes.center}>
                        <Row componentWidth="auto" mright="80px">
                            <Field
                                componentSize={ComponentSizesTypes.s}
                                selectProps={{ style: selectStyles.transparent, isSearchable: false }}
                                name="game"
                                type="select"
                                placeholder="Game"
                                options={options}
                            />
                        </Row>

                        <Description mright="80px">Date Range</Description>
                        <Description>Transaction Type</Description>
                    </Row>
                );
            }}
        </Form>
    );
};

const StyledHistory = styled(Column)<ILayout>`
    & ${StyledTbody} {
        & ${StyledTr}:hover {
            cursor: pointer;
            background: #00000026;
        }
    }
    & ${StyledTd} {
        & p {
            font-size: 16px;
        }
    }
`;

const thead = ['order', 'product', 'transaction', 'price'];

interface History {
    setSelectedTransaction: (order: IAccountPaymentTransactionsModel) => void;
    transactions: IAccountPaymentTransactionsModel[];
}

const History = ({ setSelectedTransaction, transactions }: History): ReactElement => {
    return (
        <StyledHistory>
            <Panel />
            <StyledTable>
                <StyledThead>
                    <StyledTr>
                        {thead.map(
                            (title: string): ReactElement => (
                                <StyledTh key={title}>{title.toUpperCase()}</StyledTh>
                            )
                        )}
                    </StyledTr>
                </StyledThead>
                <StyledTbody>
                    {transactions.map(
                        (transaction: IAccountPaymentTransactionsModel): ReactElement => {
                            const { order, date, game, transactionType, product, price } = transaction;
                            return (
                                <StyledTr
                                    key={Math.random() * 1000}
                                    onClick={(): void => setSelectedTransaction(transaction)}
                                >
                                    <StyledTd>
                                        <Column
                                            padding="10px 0"
                                            jc={JustifyContentTypes.spaceBetween}
                                            componentHeight="75px"
                                        >
                                            <Description color={colors.lightPink}>#{order}</Description>
                                            <Description>{date}</Description>
                                        </Column>
                                    </StyledTd>
                                    <StyledTd>
                                        <Column
                                            padding="10px 0"
                                            jc={JustifyContentTypes.spaceBetween}
                                            componentHeight="75px"
                                        >
                                            <Description color={colors.lightPink}>{game}</Description>
                                            <Description>{product}</Description>
                                        </Column>
                                    </StyledTd>
                                    <StyledTd>
                                        <Column
                                            padding="10px 0"
                                            jc={JustifyContentTypes.flexEnd}
                                            componentHeight="75px"
                                        >
                                            <Description>{transactionType}</Description>
                                        </Column>
                                    </StyledTd>
                                    <StyledTd>
                                        <Column
                                            padding="10px 0"
                                            jc={JustifyContentTypes.flexEnd}
                                            componentHeight="75px"
                                        >
                                            <Price currencyPosition={CurrencyPositionTypes.left}>{price}</Price>
                                        </Column>
                                    </StyledTd>
                                </StyledTr>
                            );
                        }
                    )}
                </StyledTbody>
            </StyledTable>
            {transactions.length && (
                <Pagination
                    mtop="30px"
                    maxValue={transactions.length}
                    total={transactions.length}
                    onNext={(i) => i}
                    onPrevious={(i) => i}
                />
            )}
        </StyledHistory>
    );
};

export { History };
