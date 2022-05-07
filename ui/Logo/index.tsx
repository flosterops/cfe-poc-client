import React, { ReactElement } from 'react';
import { Icon } from 'ui/Icon';
import { ISpaceTypes } from 'helpers/enums';
import { IconTypes } from 'helpers/icons';
import styled from 'styled-components';

interface ILogo extends ISpaceTypes {}

const StyledLogo = styled(Icon)<ILogo>`
    height: 100%;
`;

const Logo = ({ ...props }: ILogo): ReactElement => {
    return <StyledLogo {...props} alt="glyph-logo" icon={IconTypes.logo} />;
};

export { Logo };
