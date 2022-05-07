import React, { ReactElement } from 'react';
import { Layout } from 'ui/Layout';
import { AlignItemsTypes, FontSizeTypes, JustifyContentTypes } from 'helpers/enums';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { Category } from 'models/GameData';
import { fontSize, media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { INavLink, NavLink } from 'ui/NavLink';

interface Props {
    category: Category;
    channel: string;
}

const Button = styled(Layout)`
    background: linear-gradient(transparent, ${colors.gamePage.categoryLinkBg});
    border-bottom: 2px solid ${colors.gamePage.categoryLinkBg};
    width: calc(100% / 4 - 25px);
    height: 154px;
    :hover {
        background: linear-gradient(transparent, ${colors.gamePage.categoryLinkHover});
        border-bottom: 2px solid ${colors.gamePage.categoryLinkHoverBorder};
    }

    ${media.lessThan(BreakPoints.desktop)} {
        width: calc(100% / 2 - 15px);
        margin-top: 20px;
    }

    ${media.lessThan(BreakPoints.smallDesktop)} {
        height: 100px;
    }
    ${media.lessThan(BreakPoints.tablet)} {
        height: 70px;
    }

    ${media.lessThan(BreakPoints.phone)} {
        width: calc(100% / 2 - 7.5px);
        height: 38px;
        margin-top: 10px;
        background: transparent linear-gradient(0deg, #201630 0%, #2d1f45 100%) 0% 0% no-repeat padding-box;
        border-bottom: 1px solid ${colors.gamePage.categoryLinkBg};
        :hover {
            background: linear-gradient(transparent, ${colors.gamePage.categoryLinkHover});
            border-bottom: 1px solid ${colors.yellow};
        }
    }
`;

const Link = styled(NavLink)<INavLink>`
    width: 100;
    height: 100%;
`;

// TODO design have another font
const Text = styled.span`
    font-size: 32px;
    color: ${colors.lightText};
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;

    ${media.lessThan(BreakPoints.desktop)} {
        ${fontSize({ fontSize: FontSizeTypes.l })}
    }

    ${media.lessThan(BreakPoints.smallDesktop)} {
        ${fontSize({ fontSize: FontSizeTypes.l })}
    }
    ${media.lessThan(BreakPoints.tablet)} {
        ${fontSize({ fontSize: FontSizeTypes.m })}
    }
    ${media.lessThan(BreakPoints.phone)} {
        ${fontSize({ fontSize: FontSizeTypes.xs })}
    }
`;

export function CategoryLink(props: Props): ReactElement {
    const { category, channel } = props;
    return (
        <Button jc={JustifyContentTypes.center} ai={AlignItemsTypes.center}>
            <Link
                href={{
                    pathname: '/[channel]/category/[categoryId]',
                    query: { channel, categoryId: category.id.toLowerCase() },
                }}
            >
                <Text>{category.name}</Text>
            </Link>
        </Button>
    );
}
