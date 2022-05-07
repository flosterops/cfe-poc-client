import React, { FunctionComponent, ReactElement } from 'react';
import { Column, Table } from 'ui';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { ILayout } from 'ui/Layout';
import { IAccountPaymentTransactionsModel } from 'models/account';
import { CurrencyTypes } from 'models/currency';

const transactionColumns = {
    order: 'Order',
    date: 'Date',
    game: 'Game',
    transactionType: 'Transaction Type',
    product: 'Product',
    price: 'Price',
};

interface ITransactions {
    transactions: IAccountPaymentTransactionsModel[];
}

const StyledTableContainer = styled(Column)<ILayout>`
    & table tbody tr td:first-of-type {
        color: ${colors.yellow};
    }
`;

const Transactions: FunctionComponent<ITransactions> = ({ transactions }: ITransactions): ReactElement => {
    const prettifyTransactions = transactions.map((transaction: IAccountPaymentTransactionsModel) => {
        return { ...transaction, price: CurrencyTypes.EUR + transaction.price, order: `#${transaction.order}` };
    });
    return (
        <StyledTableContainer componentHeight="100%" ptop="20px">
            <Table dataSource={prettifyTransactions} columns={transactionColumns} />
        </StyledTableContainer>
    );
};

export { Transactions };
