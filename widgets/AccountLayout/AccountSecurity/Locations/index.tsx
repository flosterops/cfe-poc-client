import React, { ReactElement } from 'react';
import { Button, Column, Description, Row, Title } from 'ui';
import config from './config.json';
import { TitleTags } from 'ui/Title';
import { ComponentSizesTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import styled from 'styled-components';
import { IButton } from 'ui/Button';
import { colors } from 'helpers/colors';

interface ILocationsConfig {
    title: string;
    subTitle: string;
    secondSubTitle: string;
    submit: string;
}

const SaveButton = styled(Button)<IButton>`
    height: 45px;
    button {
        height: 43px;
    }
    border: 1px solid ${colors.yellow};
`;

const Locations = (): ReactElement => {
    const { title, subTitle, secondSubTitle, submit } = config as ILocationsConfig;
    return (
        <Column componentHeight="100%">
            <Title tagName={TitleTags.h2} fontSize={FontSizeTypes.m}>
                {title}
            </Title>
            <Description mtop="35px">{subTitle}</Description>
            <Description mtop="30px">{secondSubTitle}</Description>
            <Row componentWidth="180px" mtop="60px">
                <SaveButton componentSize={ComponentSizesTypes.full} color={colors.yellow}>
                    <Description color={colors.darkText} uppercase weight={WeightTypes.w600}>
                        {submit}
                    </Description>
                </SaveButton>
            </Row>
        </Column>
    );
};

export { Locations };
