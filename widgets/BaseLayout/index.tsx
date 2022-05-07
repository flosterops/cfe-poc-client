import { ReactNode, ReactNodeArray } from 'react';
import styled from 'styled-components';
import { ILinkItem } from 'widgets/RenderLinks';
import { Footer, Header, MobileFooter, MobileHeader } from 'widgets';
import { Column, Container } from 'ui';
import { ILayout, LayoutTags } from 'ui/Layout';
import { colors } from 'helpers/colors';
import { BreakPoints } from 'helpers/responsive';
import { IContainer } from 'ui/Container';
import { media } from 'helpers/theme';
import { IGame } from 'models/game';
import { useRouter } from 'next/router';
import { Category } from 'models/GameData';
import { HeaderElements } from 'widgets/Header';
import { getMainHeight } from 'widgets/BaseLayout/helpers';
import config from './config.json';

interface IBaseLayout {
    children: ReactNode | ReactNodeArray;
    withFooter?: boolean;
    withHeader?: boolean;
    title?: ReactNode;
    games?: IGame[];
    showOnHeader?: HeaderElements;
    categories?: Category[];
}

interface IStyledMain extends ILayout {
    full: boolean;
    footer: boolean;
}

const StyledMain = styled(Column)<IStyledMain>`
    min-height: ${({ full, footer }: IStyledMain): string => getMainHeight(full, footer).minHeight};
    height: ${({ full, footer }: IStyledMain): string => getMainHeight(full, footer).height};
    background: ${(props: IStyledMain): string => (props.full ? 'transparent' : colors.dark)};
`;

const StyledHeaderContainer = styled(Container)<IContainer>`
    border-bottom: 1px solid ${colors.darkText};
    padding: 0 35px;
    ${media.lessThan(BreakPoints.phone)} {
        padding: 0;
    }
`;

const FooterContainer = styled(Container)<IContainer>`
    padding: 0 35px;
    ${media.lessThan(BreakPoints.phone)} {
        padding: 0 15px;
    }
`;

const BaseLayout = ({
    children,
    title,
    showOnHeader,
    withFooter = true,
    withHeader = true,
    games = [],
    categories,
}: IBaseLayout) => {
    const { channel } = useRouter().query;
    const full = !withFooter && !withHeader;
    const links = config as ILinkItem[];
    return (
        <>
            {withHeader && (
                <StyledHeaderContainer color={colors.dark}>
                    <MobileHeader games={games} channel={channel as string} categories={categories || []} />
                    <Header links={links} title={title} show={showOnHeader} />
                </StyledHeaderContainer>
            )}
            <StyledMain footer={withFooter} tagName={LayoutTags.main} full={full}>
                {children}
            </StyledMain>
            {withFooter && (
                <FooterContainer color={colors.purpleMain}>
                    <Footer links={links} />
                    <MobileFooter />
                </FooterContainer>
            )}
        </>
    );
};

export { BaseLayout };
