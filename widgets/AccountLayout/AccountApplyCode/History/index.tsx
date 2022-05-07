import React, { FunctionComponent, ReactElement } from 'react';
import { Column, Description, Table } from 'ui';
import { Pagination } from 'widgets';
import { IApplyCodeTransactions } from 'models/account';

const appliedCodeColumns = {
    date: 'Date',
    game: 'Game',
    name: 'Name',
};

interface IHistory {
    transactions: IApplyCodeTransactions[];
}

const History: FunctionComponent<IHistory> = ({ transactions }: IHistory): ReactElement => {
    return (
        <Column margin="20px 0">
            {transactions?.length ? (
                <Column>
                    <Table dataSource={transactions} columns={appliedCodeColumns} />
                    {transactions.length && (
                        <Pagination
                            mtop="28px"
                            maxValue={transactions.length}
                            total={transactions.length}
                            onNext={(i) => i}
                            onPrevious={(i) => i}
                        />
                    )}
                </Column>
            ) : (
                <Description>No codes have been applied yet to your account</Description>
            )}
        </Column>
    );
};

export { History };
