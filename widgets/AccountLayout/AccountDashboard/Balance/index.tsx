import React, { FunctionComponent, ReactElement } from 'react';
import { Column, Description, Icon, Row } from 'ui';
import { colors } from 'helpers/colors';
import { IconTypes } from 'helpers/icons';
import { AlignItemsTypes, FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';

interface IBalance {
    glyph?: number;
    binary?: number;
    channel: string;
}

const Balance: FunctionComponent<IBalance> = ({ glyph = 0, binary = 0, channel }: IBalance): ReactElement => {
    return (
        <Column componentHeight="100%" jc={JustifyContentTypes.spaceAround}>
            <Description>{channel}</Description>
            <Row jc={JustifyContentTypes.spaceAround}>
                <Row componentWidth="auto" ai={AlignItemsTypes.center}>
                    <Description weight={WeightTypes.w600} fontSize={FontSizeTypes.xl} color={colors.sky}>
                        {binary}
                    </Description>
                    <Icon alt={IconTypes.binaryCoin} icon={IconTypes.binaryCoin} />
                </Row>
                <Row componentWidth="auto" ai={AlignItemsTypes.center}>
                    <Description weight={WeightTypes.w600} fontSize={FontSizeTypes.xl} color={colors.orange}>
                        {glyph}
                    </Description>
                    <Icon alt={IconTypes.glyphCoin} icon={IconTypes.glyphCoin} />
                </Row>
            </Row>
        </Column>
    );
};

export { Balance };
