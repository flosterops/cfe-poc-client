import React, { ReactElement } from 'react';
import { Layout, Row } from 'ui/Layout';
import styled from 'styled-components';
import { colors } from 'helpers/colors';

interface Checkable {
    visited: boolean;
}

const ItemIndex = styled.div<Checkable>`
    width: 40px;
    height: 40px;
    border: 1px solid ${colors.yellow};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: ${(props: Checkable): string => (props.visited ? colors.black : colors.lightText)};
    background: ${(props: Checkable): string => (props.visited ? colors.yellow : colors.purpleMain)};
`;

const ItemText = styled(Layout)<Checkable>`
    font-size: 14px;
    color: ${(props: Checkable): string => (props.visited ? colors.yellow : colors.lightText)};
`;

interface Props {
    index: string;
    text: string;
    margin?: string;
    stepIndex: number;
}

export function ProgressItem({ index, text, margin, stepIndex }: Props): ReactElement {
    const currentIndex = parseInt(index);
    const visited = currentIndex <= stepIndex;
    const indexMark = currentIndex < stepIndex ? <span>&#x2714;</span> : index;

    return (
        <Row margin={margin}>
            <ItemIndex visited={visited}>{indexMark}</ItemIndex>
            <ItemText visited={visited} componentWidth="80px" mleft="30px">
                <span>{text}</span>
            </ItemText>
        </Row>
    );
}
