import React, { FunctionComponent, ReactElement } from 'react';
import { Button, Column, Description, Row, Title } from 'ui';
import styled from 'styled-components';
import { ILayout, LayoutTags } from 'ui/Layout';
import { Field, Form } from 'widgets';
import { AlignItemsTypes, ComponentSizesTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';
import { IButton } from 'ui/Button';
import config from './config.json';
import { IFieldProps } from 'widgets/Form/FieldWrap';
import { inputStyles } from 'helpers/inputStyled';
import { isRequired, lessThan, moreThan, notAllowSpecialChapter, onlyLatin } from 'widgets/Form/validations';
import { FormikProps, FormikValues } from 'formik';
import { TitleTags } from 'ui/Title';

const { getFieldBorder, getFieldBg, getFieldHeight } = inputStyles.account;

interface IRuleConfig {
    rule: string;
}

interface IGlyphTagConfig {
    title: string;
    rules: IRuleConfig[];
    glyphTagMessage: string;
    titleWithTag: string;
    titleSetTag: string;
}

const TagContainer = styled(Column)<ILayout>`
    max-width: 900px;
`;

const SaveButton = styled(Button)<IButton>`
    width: 180px;
    height: 45px;
    button {
        height: 43px;
    }
    border: ${({ disabled }: IButton): string => `1px solid ${disabled ? colors.disabled : colors.yellow};`};
`;

const RuleList = styled(Column)<ILayout>`
    & li::before {
        color: ${colors.lightText};
        padding-right: 5px;
        content: '-';
    }
`;

const CancelButton = styled(Button)<IButton>`
    width: 180px;
    height: 45px;
    button {
        height: 43px;
    }
    border: 1px solid ${colors.yellow};
`;

const StyledField = styled(Field)<IFieldProps>`
    & input {
        height: 45px;
        padding: 0 12px;
        ${getFieldBorder};
        ${getFieldBg};
        ${getFieldHeight};
    }
`;

const tagNameValidationSchema = {
    // TODO add validations for not
    tag: [isRequired(), moreThan(3), lessThan(20), onlyLatin(), notAllowSpecialChapter()],
};

const GlyphTagForm = (): ReactElement => {
    const { title, rules } = config as IGlyphTagConfig;

    return (
        <Column>
            <Description mtop="30px">{title}</Description>
            <Form initialValues={{ tag: '' }} validations={tagNameValidationSchema}>
                {({ isValid, resetForm }: FormikProps<FormikValues>): ReactElement => {
                    return (
                        <Column>
                            <Row componentWidth="400px" mtop="20px">
                                <StyledField name="tag" type="text" componentSize={ComponentSizesTypes.full} />
                            </Row>
                            <Column mtop="30px" tagName={LayoutTags.nav}>
                                <RuleList mleft="30px" tagName={LayoutTags.ul}>
                                    {rules.map(
                                        ({ rule }: IRuleConfig): ReactElement => {
                                            return (
                                                <Row key={rule} tagName={LayoutTags.li} mbottom="10px">
                                                    <Description>{rule}</Description>
                                                </Row>
                                            );
                                        }
                                    )}
                                </RuleList>
                            </Column>
                            <Row mtop="40px">
                                <SaveButton
                                    disabled={!isValid}
                                    mright="60px"
                                    componentSize={ComponentSizesTypes.m}
                                    color={colors.yellow}
                                >
                                    <Description
                                        weight={WeightTypes.w600}
                                        color={colors.dark}
                                        uppercase
                                        fontSize={FontSizeTypes.s}
                                    >
                                        submit
                                    </Description>
                                </SaveButton>
                                <CancelButton
                                    onClick={() => resetForm()}
                                    componentSize={ComponentSizesTypes.m}
                                    color={colors.dark}
                                >
                                    <Description uppercase fontSize={FontSizeTypes.s}>
                                        cancel
                                    </Description>
                                </CancelButton>
                            </Row>
                        </Column>
                    );
                }}
            </Form>
        </Column>
    );
};

interface IGlyphTag {
    glyphTag: string;
}

const GlyphTag: FunctionComponent<IGlyphTag> = ({ glyphTag }: IGlyphTag): ReactElement => {
    const { glyphTagMessage, titleSetTag, titleWithTag } = config as IGlyphTagConfig;
    const title = glyphTag ? titleWithTag : titleSetTag;
    return (
        <TagContainer componentHeight="100%">
            <Title uppercase tagName={TitleTags.h2}>
                {title}
            </Title>
            {glyphTag ? (
                <Row padding="40px 0" ai={AlignItemsTypes.center}>
                    <Description fontSize={FontSizeTypes.s} mright="60px">
                        {glyphTag}
                    </Description>
                    <Description fontSize={FontSizeTypes.s}>{glyphTagMessage}</Description>
                </Row>
            ) : (
                <GlyphTagForm />
            )}
        </TagContainer>
    );
};

export { GlyphTag };
