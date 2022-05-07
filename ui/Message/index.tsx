import React, { FunctionComponent, ReactElement } from 'react';
import { Description, Icon, Row } from 'ui';
import { IconTypes } from 'helpers/icons';
import { AlignItemsTypes, FontSizeTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';

interface IMessage {
    text: string;
    icon: IconTypes;
    bg?: string;
    componentHeight?: string;
    padding?: string;
    textColor?: string;
}

const Message: FunctionComponent<IMessage> = ({
    text,
    icon,
    bg,
    componentHeight,
    padding,
    textColor = colors.lightText,
}: IMessage): ReactElement => {
    return (
        <Row ai={AlignItemsTypes.center} padding={padding} bg={bg} componentHeight={componentHeight}>
            <Icon alt={icon} icon={icon} mright="15px" />
            <Description fontSize={FontSizeTypes.m} color={textColor}>
                {text}
            </Description>
        </Row>
    );
};

export { Message };
