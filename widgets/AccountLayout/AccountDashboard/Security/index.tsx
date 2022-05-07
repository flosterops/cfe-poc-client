import React, { FunctionComponent, ReactElement } from 'react';
import { Column, Description } from 'ui';
import { AlignItemsTypes, FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';

interface ISecurity {
    status: number;
}

const Security: FunctionComponent<ISecurity> = ({ status }: ISecurity): ReactElement => {
    return (
        <Column componentHeight="100%" jc={JustifyContentTypes.center} ai={AlignItemsTypes.center}>
            <Description color={colors.green} fontSize={FontSizeTypes.xxl} weight={WeightTypes.w600}>
                {`${status}%`}
            </Description>
        </Column>
    );
};

export { Security };
