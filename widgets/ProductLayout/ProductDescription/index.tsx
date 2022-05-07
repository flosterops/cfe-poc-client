import React, { FunctionComponent, ReactElement } from 'react';
import { Column, Description, Title } from 'ui';
import { AlignItemsTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import { TitleTags } from 'ui/Title';
import { ai, media } from 'helpers/theme';
import { ILayout } from 'ui/Layout';
import styled from 'styled-components';
import { BreakPoints } from 'helpers/responsive';

interface IProductDescription {
    descriptions: string[] | null;
}

const StyledContainer = styled(Column)<ILayout>`
    ${ai({ ai: AlignItemsTypes.center })}
    ${media.lessThan(BreakPoints.phone)} {
        display: none;
    }
`;

const ProductDescription: FunctionComponent<IProductDescription> = ({
    descriptions,
}: IProductDescription): ReactElement | null => {
    if (!descriptions?.length) {
        return null;
    }

    return (
        <StyledContainer ai={AlignItemsTypes.center}>
            <Title tagName={TitleTags.h2} weight={WeightTypes.w600} fontSize={FontSizeTypes.xxl}>
                Description
            </Title>
            {descriptions.map(
                (description: string): ReactElement => {
                    return <Description key={Math.random() * 1000}>{description}</Description>;
                }
            )}
        </StyledContainer>
    );
};

export { ProductDescription };
