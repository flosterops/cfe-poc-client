import React, { ReactElement } from 'react';
import { ILayout, Layout, Row } from 'ui/Layout';
import { CartItemsList } from './CartItemsList';
import { CartTotal } from './CartTotal';
import { JustifyContentTypes } from 'helpers/enums';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { constants } from 'helpers/constants';

interface Props {
    channel: string;
}

const Wrapper = styled(Layout)`
    background: ${colors.purplePink};
    min-height: 100%;
`;

const Container = styled(Row)<ILayout>`
    max-width: ${constants.width};
`;

export function CartMain(props: Props): ReactElement {
    const { channel } = props;
    return (
        <Wrapper padding="0 35px">
            <Container ptop="80px" pbottom="20px" margin="0 auto" jc={JustifyContentTypes.spaceBetween}>
                <CartItemsList channel={channel} />
                <CartTotal channel={channel} />
            </Container>
        </Wrapper>
    );
}
