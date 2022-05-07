import React, { FunctionComponent, ReactElement } from 'react';
import { AddToCart, BuyNowButton } from 'widgets';
import { PurchaseType } from 'models/GameData';
import { FastBuyButton } from './FastBuyButton';

interface Props {
    id: string;
    channel: string;
    purchaseType: PurchaseType;
    setModalMessage: () => void;
}

// TODO as we can do Purchase depends on [purchaseType] from anywhere we should use this component everywhere
// TODO And move all children components in this folder
const PurchaseButton: FunctionComponent<Props> = ({
    id,
    channel,
    purchaseType,
    setModalMessage,
}: Props): ReactElement => {
    if (purchaseType === PurchaseType.cart) {
        return <AddToCart id={id} setModalMessage={setModalMessage} />;
    } else if (purchaseType === PurchaseType.fastBuy) {
        return (
            // TODO handle [currencyCode] properly
            <FastBuyButton
                channel={channel}
                products={[
                    {
                        productId: id,
                        quantity: 1,
                        currencyCode: 'USD',
                    },
                ]}
            />
        );
    } else {
        return <BuyNowButton id={id} channel={channel} />;
    }
};

export { PurchaseButton };
