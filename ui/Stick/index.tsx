import styled from 'styled-components';
import { ISpaceTypes } from 'helpers/enums';
import { space } from 'helpers/theme';

export const Stick = styled.div<ISpaceTypes & { color: string }>`
    ${space}
    background: ${(props) => props.color};
    height: 4px;
    width: 100%;
`;
