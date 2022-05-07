import React, { ReactElement } from 'react';
import { Button, Column, Description, Row } from 'ui';
import { ComponentSizesTypes, InputTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';
import { Field, Form } from 'widgets';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { IFieldProps } from 'widgets/Form/FieldWrap';
import { inputStyles } from 'helpers/inputStyled';
import { IButton } from 'ui/Button';
import { isRequired } from 'widgets/Form/validations';

const { getFieldBorder, getFieldBg, getFieldHeight } = inputStyles.account;

const StyledField = styled(Field)<IFieldProps>`
    input {
        padding: 0 12px;
        ${getFieldBorder};
        ${getFieldBg};
        ${getFieldHeight};
    }
`;

const Apply = styled(Button)<IButton>`
    button {
        height: 45px;
        border: 1px solid ${(props) => (props.disabled ? colors.disabled : colors.yellow)};
    }
`;

const StyledFormWrap = styled(Column)<ILayout>`
    max-width: 700px;
`;

const applyCodeValidationSchema = {
    // TODO add validations
    applyCode: [isRequired()],
};

const Code = (): ReactElement => {
    return (
        <StyledFormWrap jc={JustifyContentTypes.spaceBetween} componentHeight="100%" padding="20px 0">
            <Description>Type or paste code here. Hyphens will be inserted automatically</Description>
            <Form initialValues={{ applyCode: '' }} validations={applyCodeValidationSchema}>
                {(): ReactElement => {
                    return (
                        <Row componentHeight="100%">
                            <StyledField
                                componentSize={ComponentSizesTypes.full}
                                type={InputTypes.text}
                                name="applyCode"
                                color={colors.dark}
                            />
                            <Apply color={colors.yellow} componentSize={ComponentSizesTypes.l}>
                                <Description weight={WeightTypes.w600} uppercase color={colors.darkText}>
                                    apply code
                                </Description>
                            </Apply>
                        </Row>
                    );
                }}
            </Form>
        </StyledFormWrap>
    );
};

export { Code };
