import React, { ReactElement } from 'react';
import { Layout } from 'ui/Layout';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { useTranslation } from 'react-i18next';
import { Categories, Category } from 'models/Categories';
import Link from 'next/link';

interface Props {
    categories: Categories;
    channel: string;
}

const Title = styled.h1`
    color: ${colors.lightText};
    font-size: 28px;
    margin-bottom: 23px;
    text-transform: uppercase;
`;

const CategoryView = styled(Layout)`
    color: ${colors.lightText};
    height: 70px;
    background: ${colors.dark};
    cursor: pointer;
    font-size: 16px;
    text-transform: uppercase;
`;

export const CategoryFilter = (props: Props): ReactElement => {
    const { t } = useTranslation('categories');
    const { categories, channel } = props;

    return (
        <Layout componentWidth="318px">
            <Title>{t('filter by category')}</Title>
            <Layout componentWidth="318px">
                {categories.categories.map(
                    (category: Category): ReactElement => (
                        <Link
                            key={category.id}
                            href={{
                                pathname: '/[channel]/category/[categoryId]',
                                query: {
                                    channel,
                                    categoryId: category.id,
                                },
                            }}
                        >
                            <CategoryView padding="23px 20px" mbottom="20px">
                                {category.name}
                            </CategoryView>
                        </Link>
                    )
                )}
            </Layout>
        </Layout>
    );
};
