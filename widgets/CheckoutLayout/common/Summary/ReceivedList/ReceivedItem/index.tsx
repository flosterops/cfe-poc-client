import React, { ReactElement } from 'react';
import { ISummaryItem } from 'models/purchase/ISummaryItem';
import { Layout } from 'ui/Layout';
import styled from 'styled-components';
import { colors } from 'helpers/colors';

const Wrapper = styled(Layout)`
    background: ${colors.black};
`;

const Img = styled.img`
    width: 200px;
    height: 102px;
`;

const Name = styled.span`
    font-size: 15px;
    color: ${colors.secondaryText};
    text-transform: uppercase;
`;

interface Props {
    item: ISummaryItem;
}

export function ReceivedItem({ item }: Props): ReactElement {
    return (
        <Wrapper componentWidth="200px" componentHeight="220px" margin="0 30px 28px 0">
            <Img src={item.img} alt={item.name} />
            <Layout padding="18px 14px">
                <Name>{item.name}</Name>
            </Layout>
        </Wrapper>
    );
}
