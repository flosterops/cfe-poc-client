import React, { FunctionComponent, ReactElement } from 'react';
import { Description, Row, BackToIcon } from 'ui';
import { AlignItemsTypes, ISpaceTypes, JustifyContentTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { IBackToIcon } from 'ui/Icon/BackToIcon';

const Previous = styled(BackToIcon)<IBackToIcon>`
    transform: rotate(180deg);
`;

const Arrow = styled(Row)<ILayout>`
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

interface IPagination extends ISpaceTypes {
    gap?: number;
    minValue?: number;
    maxValue?: number;
    total?: number;
    onNext: (...args: any) => void;
    onPrevious: (...args: any) => void;
}

const Pagination: FunctionComponent<IPagination> = ({
    gap = 15,
    maxValue = 15,
    minValue = 1,
    total = 15,
    onNext,
    onPrevious,
    ...props
}: IPagination): ReactElement => {
    return (
        <Row jc={JustifyContentTypes.spaceBetween} componentHeight="20px" {...props}>
            <Row ai={AlignItemsTypes.center} componentWidth="auto">
                <Description color={colors.yellow}>
                    Showing {minValue} - {maxValue} of {total} results
                </Description>
            </Row>
            <Row componentHeight="100%" ai={AlignItemsTypes.center} componentWidth="auto">
                <Arrow onClick={onPrevious} mright="25px">
                    <Previous color={colors.yellow} />
                </Arrow>
                <Arrow onClick={onNext} mleft="25px">
                    <BackToIcon color={colors.yellow} />
                </Arrow>
            </Row>
        </Row>
    );
};

export { Pagination };
