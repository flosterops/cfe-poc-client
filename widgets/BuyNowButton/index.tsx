import React, { FunctionComponent, ReactElement } from 'react';
import { Button, Description, Layout } from 'ui';
import { AlignItemsTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';
import { useRouter } from 'next/router';

interface IAddToCart {
    id: string;
    channel: string;
}

const BuyNowButton: FunctionComponent<IAddToCart> = ({ id, channel }: IAddToCart): ReactElement => {
    const router = useRouter();

    return (
        <Layout padding="15px" ai={AlignItemsTypes.center}>
            <Button
                color={colors.yellow}
                onClick={(): void => {
                    router.push({
                        pathname: '/[channel]/buy-now/[productId]',
                        query: { channel, productId: id },
                    });
                }}
            >
                <Description color={colors.black} uppercase weight={WeightTypes.w600} fontSize={FontSizeTypes.m}>
                    Buy Now
                </Description>
            </Button>
        </Layout>
    );
};

export { BuyNowButton };
