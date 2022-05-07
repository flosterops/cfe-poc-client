import React, { FunctionComponent, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Layout } from 'ui/Layout';
import { AlignItemsTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import { Button } from 'ui/Button';
import { colors } from 'helpers/colors';
import { Description } from 'ui/Description';
import { purchaseProduct, PurchaseResult } from 'requests/purchase-product';
import { IPurchaseItem } from 'models/purchaseItem';
import { useAuth } from 'helpers/useAuth';

interface Props {
    channel: string;
    products: IPurchaseItem[];
}

const FastBuyButton: FunctionComponent<Props> = ({ channel, products }: Props): ReactElement => {
    const router = useRouter();
    const { user } = useAuth();

    const purchase = (): void => {
        const token = user?.token || '';
        const accountId = user?.account?.accountId || 0;
        purchaseProduct(products, channel, token, accountId).then((data: PurchaseResult): void => {
            router.push({
                pathname: '/[channel]/purchase-summary/[transactionId]',
                query: {
                    channel,
                    transactionId: data.transactionId,
                },
            });
        });
    };

    return (
        <Layout padding="15px" ai={AlignItemsTypes.center}>
            <Button color={colors.yellow} onClick={purchase}>
                <Description color={colors.black} uppercase weight={WeightTypes.w600} fontSize={FontSizeTypes.m}>
                    Buy Now
                </Description>
            </Button>
        </Layout>
    );
};

export { FastBuyButton };
