import React, { FunctionComponent, ReactElement, useState } from 'react';
import { ISelectOptionsModel } from 'widgets/Form/Fields/SelectSearch';
import { SelectCount } from 'widgets';
import { Row, Button, Description } from 'ui';
import { addProductToLS } from 'helpers/addProductToLS';
import { FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';
import { connect } from 'react-redux';
import { addProductToCart } from 'stores/reducers/cartReducer/actions';
import { useRouter } from 'next/router';

interface IAddToCart {
    id: string;
    setModalMessage: () => void;
    addProductToCart: (id: string, count: number, channel: string) => void;
}

const AddToCart: FunctionComponent<IAddToCart> = ({
    id,
    setModalMessage,
    addProductToCart,
}: IAddToCart): ReactElement => {
    const [count, setCount] = useState<number>(1);
    const router = useRouter();

    const onAddToCart = (): void => {
        addProductToLS(id, count);
        // TODO use this method when we will get API for it
        // addProductToCart(id, count, router.query.channel as string);
        setModalMessage();
    };

    return (
        <Row padding="15px 15px" jc={JustifyContentTypes.spaceBetween}>
            <SelectCount onChange={({ value }: ISelectOptionsModel) => setCount(value as number)} />
            <Button color={colors.yellow} onClick={onAddToCart}>
                <Description color={colors.black} uppercase weight={WeightTypes.w600} fontSize={FontSizeTypes.m}>
                    add to cart
                </Description>
            </Button>
        </Row>
    );
};

const ConnectedAddToCart = connect(null, { addProductToCart })(AddToCart);

export { ConnectedAddToCart as AddToCart };
