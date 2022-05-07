import { ReactElement } from 'react';
import styled from 'styled-components';
import { Namespaces, withDefaultNamespaces } from 'i18n/helpers';
import { Button, Column, Description, Row, Title } from 'ui';
import { ILayout } from 'ui/Layout';
import { request } from 'helpers/basicAxios';
import { TitleTags } from 'ui/Title';
import {
    AlignItemsTypes,
    ComponentSizesTypes,
    FontSizeTypes,
    ISpaceTypes,
    JustifyContentTypes,
    WeightTypes,
} from 'helpers/enums';
import { colors } from 'helpers/colors';
import { BaseLayout, Field, Form } from 'widgets';
import { space } from 'helpers/theme';
import { getProductUrl } from 'requests/get-product-url';
import { getProduct } from 'requests/get-product';
import { createProductFromResponse, Product } from 'models/product';
import { useRouter } from 'next/router';
import { constants } from 'helpers/constants';
import { getChannels } from '../../../../../requests/getChannels';
import { IGame } from '../../../../../models/game';

interface ICreditCard {
    id: string;
    name: string;
}

const checkoutNamespaces = withDefaultNamespaces();

const StyledCheckoutPageContainer = styled(Row)<ILayout>`
    min-height: calc(100vh - 61px);
    background: transparent linear-gradient(90deg, ${colors.purplePink} 0%, ${colors.purpleMain} 100%) 0% 0% no-repeat
        padding-box;
`;

const StyledInnerContainer = styled(Row)<ILayout>`
    max-width: ${constants.width.lgDesktop};
`;

const StyledBox = styled(Column)<ILayout & { minWidth?: string }>`
    background-color: rgba(44, 31, 66, 0.55);
    min-width: ${(props) => (props.minWidth ? props.minWidth : 'auto')};
`;

const StyledStick = styled.div<ISpaceTypes & { bg: string }>`
    height: 4px;
    width: 100%;
    background: ${(props) => props.bg};
    ${space}
`;

const StyledImg = styled.img<ISpaceTypes>`
    ${space}
    height: 200px;
`;

interface ICheckoutPage {
    creditCards: ICreditCard[];
    product: Product | null;
    games: IGame[];
}

const CheckoutPage = ({ creditCards, product, games }: ICheckoutPage): ReactElement | null => {
    const router = useRouter();
    if (!product) {
        router.push('/404');
        return null;
    }

    const { price, img } = product;
    return (
        <BaseLayout games={games} withFooter={false}>
            <Form initialValues={{}}>
                {(): ReactElement => {
                    return (
                        <StyledCheckoutPageContainer>
                            <StyledInnerContainer componentHeight="100%" margin="0 auto" padding="90px 50px 0">
                                <StyledBox componentWidth="65%" bg={colors.dark} padding="30px 40px">
                                    <Title tagName={TitleTags.default} uppercase fontSize={FontSizeTypes.l}>
                                        1. chose a payment method
                                    </Title>
                                    {creditCards.map(
                                        ({ id, name }: ICreditCard): ReactElement => {
                                            return (
                                                <Column
                                                    key={id}
                                                    bg="#3E2B5D"
                                                    componentHeight="110px"
                                                    mtop="20px"
                                                    jc={JustifyContentTypes.center}
                                                >
                                                    <Row mleft="70px" ai={AlignItemsTypes.center}>
                                                        <Field name={name} type="checkbox" />
                                                        <Description>{name}</Description>
                                                    </Row>
                                                </Column>
                                            );
                                        }
                                    )}
                                </StyledBox>
                                <StyledBox componentWidth="35%" minWidth="300px" mleft="30px" padding="30px 40px">
                                    <Title
                                        tagName={TitleTags.default}
                                        uppercase
                                        fontSize={FontSizeTypes.l}
                                        mbottom="30px"
                                    >
                                        2. review your order
                                    </Title>
                                    <Row jc={JustifyContentTypes.center}>
                                        {img && <StyledImg src={img} mbottom="30px" />}
                                    </Row>
                                    <Row jc={JustifyContentTypes.spaceBetween} mbottom="30px">
                                        <Description>1500 credits</Description>
                                        <Description>9.99</Description>
                                    </Row>
                                    <StyledStick mbottom="30px" bg={colors.yellow} />
                                    <Row jc={JustifyContentTypes.spaceBetween} mbottom="30px">
                                        <Description>Subtotal:</Description>
                                        <Description>{price}</Description>
                                    </Row>
                                    <Row jc={JustifyContentTypes.spaceBetween}>
                                        <Description>Tax (if applicable)</Description>
                                        <Description>0</Description>
                                    </Row>
                                    <Row jc={JustifyContentTypes.spaceBetween} margin="80px 0">
                                        <Description fontSize={FontSizeTypes.l} weight={WeightTypes.w600}>
                                            Total:
                                        </Description>
                                        <Description fontSize={FontSizeTypes.l} weight={WeightTypes.w600}>
                                            {price}
                                        </Description>
                                    </Row>
                                    <Button disabled color={colors.yellow} componentSize={ComponentSizesTypes.full}>
                                        buy now
                                    </Button>
                                </StyledBox>
                            </StyledInnerContainer>
                        </StyledCheckoutPageContainer>
                    );
                }}
            </Form>
        </BaseLayout>
    );
};

interface InitialProps {
    props: {
        creditCards: ICreditCard[];
        product: Product | null;
        namespacesRequired: Namespaces[];
        games: IGame[];
    };
}

export async function getServerSideProps(context: any): Promise<InitialProps> {
    const { data } = await request.get('/mocks/credit-cards.json');
    const productUrl = await getProductUrl(context.params.channel, context.params.productId);
    const productResponse = await getProduct(productUrl);
    const product = createProductFromResponse(productResponse);
    const channels = await getChannels();
    return {
        props: {
            product,
            creditCards: data || [],
            namespacesRequired: checkoutNamespaces,
            games: channels || [],
        },
    };
}

export default CheckoutPage;
