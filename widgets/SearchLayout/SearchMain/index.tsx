import React, { FunctionComponent, ReactElement } from 'react';
import { Column, Container, Description, Row, Title } from 'ui';
import { ITitle, TitleTags } from 'ui/Title';
import { FontSizeTypes, WeightTypes } from 'helpers/enums';
import { makePlural } from 'helpers/makePlural';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { ProductPreview } from 'models/ProductsByCategoriesList';
import { FilteredProduct } from 'widgets/CategoryLayout/CategoryMain/FilteredProductList/FilteredProduct';
import { constants } from 'helpers/constants';
import { colors } from 'helpers/colors';
import { SortDropdown } from 'widgets/CategoryLayout/CategoryMain/SortDropdown';

const Results = styled(Row)<ILayout>`
    flex-wrap: wrap;
`;

const StyledTitle = styled(Title)<ITitle>`
    font-size: 30px;
    letter-spacing: 0px;
`;

const SearchInfo = styled(Column)<ILayout>`
    min-width: 320px;
`;

const StyledMain = styled(Row)<ILayout>`
    margin: 0 auto;
    max-width: ${constants.width.lgDesktop};
`;

interface SearchMain {
    search: string;
    channel: string;
    results: ProductPreview[];
}

const SearchMain: FunctionComponent<SearchMain> = ({ search, results, channel }: SearchMain): ReactElement => {
    const itemPlural = { single: 'item', plural: 'items' };

    return (
        <Container padding="40px 35px">
            <SortDropdown />
            <StyledMain>
                <SearchInfo componentWidth="auto">
                    <StyledTitle tagName={TitleTags.h2} fontSize={FontSizeTypes.l} uppercase weight={WeightTypes.w600}>
                        Search result for
                    </StyledTitle>
                    <StyledTitle
                        tagName={TitleTags.h3}
                        mtop="10px"
                        uppercase
                        fontSize={FontSizeTypes.l}
                        color={colors.yellow}
                    >
                        {search}
                    </StyledTitle>
                    <Description mtop="35px" fontSize={FontSizeTypes.m} uppercase>
                        {results.length} {makePlural(results.length, itemPlural)}
                    </Description>
                </SearchInfo>
                {!!results.length && (
                    <Results mleft={results.length > 2 ? 'auto' : '0'} componentWidth="auto">
                        {results.map((product: ProductPreview) => {
                            return (
                                <Row key={product.id} componentWidth="auto" padding="0 0 30px 30px">
                                    <FilteredProduct products={product} channel={channel} />;
                                </Row>
                            );
                        })}
                    </Results>
                )}
            </StyledMain>
        </Container>
    );
};

export { SearchMain };
