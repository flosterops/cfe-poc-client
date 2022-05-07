import React, { FunctionComponent, ReactElement } from 'react';
import { Column, Description, Icon, Row } from 'ui';
import { colors } from 'helpers/colors';
import { FontSizeTypes } from 'helpers/enums';
import { IValidationModel } from 'models/validation';
import { IconTypes } from 'helpers/icons';
import styled from 'styled-components';

const StyledValidationItem = styled(Row)`
    &:last-of-type {
        margin-bottom: 0;
    }
`;

const ValidationItem = ({ valid, text }: IValidationModel): ReactElement => {
    const icon = valid ? IconTypes.circleCheck : IconTypes.circleNotCheck;
    return (
        <StyledValidationItem mbottom="10px">
            <Icon alt={icon} icon={icon} mright="10px" />
            <Description fontSize={FontSizeTypes.xs}>{text}</Description>
        </StyledValidationItem>
    );
};

interface IValidationPopOver {
    validations: IValidationModel[];
}

const ValidationPopOver: FunctionComponent<IValidationPopOver> = ({
    validations,
}: IValidationPopOver): ReactElement => {
    return (
        <Column componentWidth="350px" bg={colors.dark} padding="10px">
            {validations.map(
                ({ text, valid }: IValidationModel): ReactElement => {
                    return <ValidationItem key={text} text={text} valid={valid} />;
                }
            )}
        </Column>
    );
};

export { ValidationPopOver };
