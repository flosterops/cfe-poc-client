import React, { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from 'helpers/colors';

function getParsedColumnTitles(columns: { [key: string]: string }): string[] {
    const keys = Object.keys(columns);
    return keys.map((key: string): string => columns[key].toUpperCase());
}

function getColumnFields(columns: { [key: string]: string }): string[] {
    return Object.keys(columns);
}

export interface ITable {
    dataSource: any[];
    // column is an object where name of field it's name of the field from data source and value it's value from Table <th> title
    columns: { [key: string]: string };
}

export const StyledTable = styled.table`
    border: 1px solid ${colors.darkText};
    width: 100%;
    border-collapse: collapse;
`;

export const StyledThead = styled.thead`
    width: 100%;
    background: ${colors.grayMedium};
`;

export const StyledTbody = styled.tbody`
    & tr {
        border-top: 1px solid ${colors.darkText};
    }
`;

export const StyledTd = styled.td`
    border: 0;
    padding: 0 0 0 15px;
    color: ${colors.lightText};
`;

export const StyledTr = styled.tr`
    &:nth-child(even) {
        background: ${colors.purpleMain};
    }
    height: 50px;
    font-weight: 400;
`;

export const StyledTh = styled.th`
    height: 50px;
    padding: 0 0 0 15px;
    font-weight: 400;
    text-align: start;
    color: ${colors.darkText};
`;

const Table: FunctionComponent<ITable> = ({ dataSource, columns }: ITable): ReactElement => {
    const titles = getParsedColumnTitles(columns);
    const fields = getColumnFields(columns);
    return (
        <StyledTable>
            <StyledThead>
                <StyledTr>
                    {titles.map(
                        (title: string): ReactElement => {
                            return <StyledTh key={title}>{title}</StyledTh>;
                        }
                    )}
                </StyledTr>
            </StyledThead>
            <StyledTbody>
                {dataSource.map(
                    (item: any): ReactElement => {
                        return (
                            <StyledTr key={Math.random() * 1000}>
                                {fields.map(
                                    (field: string): ReactElement => {
                                        return <StyledTd key={Math.random() * 1000}>{item[field]}</StyledTd>;
                                    }
                                )}
                            </StyledTr>
                        );
                    }
                )}
            </StyledTbody>
        </StyledTable>
    );
};

export { Table };
