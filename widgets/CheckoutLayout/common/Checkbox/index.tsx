import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Layout } from 'ui/Layout';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';

interface ContainerProps {
    value: boolean;
}

const CheckboxContainer = styled(Layout)<ContainerProps>`
    border-radius: 4px;
    font-size: 10px;
    border: 1px solid ${colors.yellow};
    color: ${colors.black};
    cursor: pointer;
    background: ${(props: ContainerProps): string => (props.value ? colors.yellow : 'transparent')};
`;

interface Props {
    value: boolean;
    change: () => void;
}

// TODO this checkbox should use [input] element for accessibility and use [label]
export function Checkbox({ value, change }: Props): ReactElement {
    if (value) {
        return (
            <CheckboxContainer
                componentWidth="16px"
                componentHeight="16px"
                jc={JustifyContentTypes.center}
                ai={AlignItemsTypes.center}
                value={value}
                onClick={change}
            >
                &#x2714;
            </CheckboxContainer>
        );
    } else {
        return (
            <CheckboxContainer
                componentWidth="16px"
                componentHeight="16px"
                jc={JustifyContentTypes.center}
                ai={AlignItemsTypes.center}
                value={value}
                onClick={change}
            />
        );
    }
}
