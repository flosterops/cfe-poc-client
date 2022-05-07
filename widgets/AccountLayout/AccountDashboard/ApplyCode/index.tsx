import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Description, Row } from 'ui';
import { AlignItemsTypes, ComponentSizesTypes, InputTypes, WeightTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';
import { Field, Form } from 'widgets';
import { ILayout, Column } from 'ui/Layout';
import { IButton, Button } from 'ui/Button';
import { inputStyles } from 'helpers/inputStyled';

const { getFieldBorder, getFieldBg, getFieldHeight } = inputStyles.account;

const StyledFormWrap = styled(Column)<ILayout>`
    & form {
        height: 100%;
        & input {
            height: 45px;
            ${getFieldBorder({ type: 'text' } as any)};
            ${getFieldBg({ type: 'text' } as any)};
            ${getFieldHeight({ type: 'text' } as any)};
        }
    }
`;

const StyledButton = styled(Button)<IButton>`
    & button {
        width: 120px;
        height: 45px;
    }
`;

const ApplyCode = (): ReactElement => {
    return (
        <StyledFormWrap componentHeight="100%">
            <Form initialValues={{ applyCode: '' }}>
                {(): ReactElement => {
                    return (
                        <Row componentHeight="100%" ai={AlignItemsTypes.center}>
                            <Field
                                componentSize={ComponentSizesTypes.full}
                                type={InputTypes.text}
                                name="applyCode"
                                color={colors.dark}
                            />
                            <StyledButton color={colors.yellow} componentSize={ComponentSizesTypes.s}>
                                <Description weight={WeightTypes.w600} uppercase color={colors.darkText}>
                                    apply
                                </Description>
                            </StyledButton>
                        </Row>
                    );
                }}
            </Form>
        </StyledFormWrap>
    );
};

export { ApplyCode };
