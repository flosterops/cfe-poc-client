import React, { ReactElement } from 'react';
import { ISummaryItem } from 'models/purchase/ISummaryItem';
import { Row } from 'ui/Layout';
import styled from 'styled-components';
import { ReceivedItem } from './ReceivedItem';
import { PurchaseResult } from 'requests/getPurchaseData';

const Wrapper = styled(Row)`
    flex-wrap: wrap;
`;

interface Props {
    itemList: PurchaseResult;
}

export function ReceivedList({ itemList }: Props): ReactElement {
    return (
        <Wrapper>
            {itemList.result.map(
                (item: ISummaryItem): ReactElement => (
                    <ReceivedItem item={item} key={item.id} />
                )
            )}
        </Wrapper>
    );
}
