import React, { FunctionComponent, ReactElement } from 'react';
import { Column, Title } from 'ui';
import { ITitle, TitleTags } from 'ui/Title';
import { AlignItemsTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { ai, fontSize, media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';

interface IProductIncludes {
    Includes: FunctionComponent<{}> | null;
}

const StyledContainer = styled(Column)<ILayout>`
    ${ai({ ai: AlignItemsTypes.center })}
    ${media.lessThan(BreakPoints.phone)} {
        ${ai({ ai: AlignItemsTypes.flexStart })}
    }
`;

const ProductIncludesTitle = styled(Title)<ITitle>`
    ${media.lessThan(BreakPoints.phone)} {
        ${fontSize({ fontSize: FontSizeTypes.l })}
        margin-bottom: 10px;
    }
`;

const ProductIncludes: FunctionComponent<IProductIncludes> = ({ Includes }: IProductIncludes): ReactElement | null => {
    if (!Includes) {
        return null;
    }

    return (
        <StyledContainer>
            <ProductIncludesTitle tagName={TitleTags.h2} weight={WeightTypes.w600} fontSize={FontSizeTypes.xxl}>
                Includes
            </ProductIncludesTitle>
            {Includes}
        </StyledContainer>
    );
};

export { ProductIncludes };
