import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlignItemsTypes, FontSizeTypes, JustifyContentTypes } from 'helpers/enums';
import { Column, Description, Icon, Row, CloseIcon } from 'ui';
import { colors } from 'helpers/colors';
import { IconTypes } from 'helpers/icons';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { IIcon } from 'ui/Icon';
import { useRouter } from 'next/router';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import config from './config.json';

interface IMessageAddCartConfig {
    title: string;
    subTitle: string;
    link: string;
}

const Arrow = styled(Icon)<IIcon>`
    transform: rotate(180deg);
`;

interface IMessageContainer extends ILayout {
    visible: boolean;
}

const MessageContainer = styled(Column)<IMessageContainer>`
    position: fixed;
    left: ${(props) => (props.visible ? 'calc(100vw - 355px)' : '100vw')};
    opacity: ${(props) => (props.visible ? '1' : '0.1')};
    bottom: 40px;
    border-bottom: 4px solid ${colors.yellow};
    transition: all 0.4s ease;
    ${media.lessThan(BreakPoints.phone)} {
        display: none;
    }
`;

interface IMessageAddCart {
    channel: string;
    onClose: () => void;
}

const MessageAddCart: FunctionComponent<IMessageAddCart> = ({ channel, onClose }: IMessageAddCart): ReactElement => {
    const { title, subTitle, link } = config as IMessageAddCartConfig;
    const [visible, setVisible] = useState<boolean>(false);
    const root = document.getElementsByTagName('body')[0];
    const router = useRouter();

    useEffect((): void => {
        setVisible(true);
    }, []);

    return createPortal(
        <MessageContainer visible={visible} componentWidth="310px" bg={colors.black} padding="10px 15px 15px 25px">
            <Row jc={JustifyContentTypes.flexEnd}>
                <CloseIcon width={18} height={18} onClick={onClose} />
            </Row>
            <Row ai={AlignItemsTypes.center}>
                <Icon width="45px" height="30px" alt={IconTypes.cart} icon={IconTypes.cart} />
                <Column mleft="35px">
                    <Description uppercase fontSize={FontSizeTypes.xs}>
                        {title}
                    </Description>
                    <Description mtop="8px" fontSize={FontSizeTypes.xs}>
                        {subTitle}
                    </Description>
                    <Row
                        mtop="5px"
                        onClick={(): Promise<boolean> => router.push(`/[channel]/cart`, `/${channel}/cart`)}
                        ai={AlignItemsTypes.center}
                    >
                        <Description fontSize={FontSizeTypes.xs} color={colors.yellow}>
                            {link}
                        </Description>
                        <Arrow
                            mleft="5px"
                            icon={IconTypes.backArrow}
                            width="11px"
                            height="9px"
                            alt={IconTypes.backArrow}
                        />
                    </Row>
                </Column>
            </Row>
        </MessageContainer>,
        root
    );
};

export { MessageAddCart };
