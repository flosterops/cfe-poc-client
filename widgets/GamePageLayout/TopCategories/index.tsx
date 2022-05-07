import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { useTranslation } from 'react-i18next';
import { Row } from 'ui';
import { FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import { Category } from 'models/GameData';
import { ILayout } from 'ui/Layout';
import { CategoryLink } from './CategoryLink';
import { fontSize, media, weight } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { constants } from '../../../helpers/constants';

interface Props {
    topCategories: Category[];
    channel: string;
    title?: boolean;
}

const Title = styled.h2`
    color: ${colors.lightText};
    font-size: 50px;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    margin: 20px 0;
    ${media.lessThan(BreakPoints.phone)} {
        ${fontSize({ fontSize: FontSizeTypes.m })}
        ${weight({ weight: WeightTypes.w500 })}
        text-align: start;
        letter-spacing: 0px;
        margin: 25px 0 5px;
    }
`;

const Container = styled(Row)<ILayout>`
    margin: 0 auto;
    max-width: ${constants.width.lgDesktop};
    flex-wrap: wrap;
`;

export const TopCategories = (props: Props): ReactElement => {
    const { topCategories, title = true, channel } = props;
    const { t } = useTranslation('game-page');

    return (
        <>
            {title && <Title>{t('top categories')}</Title>}
            <Container jc={JustifyContentTypes.spaceBetween}>
                {topCategories.map(
                    (category: Category): ReactElement => (
                        <CategoryLink key={category.id} channel={channel} category={category} />
                    )
                )}
            </Container>
        </>
    );
};
