import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ILayout } from 'ui/Layout';
import styled from 'styled-components';
import { MenuPosition } from 'widgets/Mobile/MobileMenu';
import { JustifyContentTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';
import { Description, CloseIcon, Column, Row } from 'ui';
import { getMenuStyleByPosition } from 'widgets/MenuDrawer/helpers';

interface IStyledMobileMenu extends ILayout {
    visible: boolean;
    position: MenuPosition;
}

const StyledMobileMenu = styled(Column)<IStyledMobileMenu>`
    transition: all 0.4s ease;
    ${({ position, visible }: IStyledMobileMenu): string => getMenuStyleByPosition(position, visible)}
`;

const Drawer = styled(Row)<ILayout>`
    position: fixed;
    backdrop-filter: blur(8px);
    top: 0;
    z-index: 20;
`;

interface MenuDrawer {
    position: MenuPosition;
    onClose: () => void;
}

const MenuDrawer = ({ children, position, onClose }: PropsWithChildren<MenuDrawer>): ReactElement => {
    const root = document.getElementsByTagName('body')[0];
    const [visible, setVisible] = useState<boolean>(false);
    useEffect((): void | (() => void) => {
        setVisible(true);
        return (): void => {
            setVisible(false);
        };
    }, []);

    const handleClose = (): void => {
        setVisible(false);
        setTimeout((): void => {
            onClose();
        }, 300);
    };

    const jc = position === MenuPosition.right ? JustifyContentTypes.flexEnd : JustifyContentTypes.flexStart;
    const jcIcon = position === MenuPosition.right ? JustifyContentTypes.flexStart : JustifyContentTypes.flexEnd;

    return createPortal(
        <Drawer jc={jc} componentHeight="100%" componentWidth="100%">
            <StyledMobileMenu
                componentWidth="300px"
                componentHeight="100vh"
                bg={colors.dark}
                padding="10px 0 40px"
                visible={visible}
                position={position}
            >
                <Row padding="0 15px" jc={jcIcon}>
                    <CloseIcon onClick={handleClose} />
                </Row>

                <Column componentHeight="100%" jc={JustifyContentTypes.spaceBetween}>
                    <Column>{children}</Column>
                    <Row jc={JustifyContentTypes.center}>
                        <Description color={colors.grayMedium}>About Launcher Glyph.net</Description>
                    </Row>
                </Column>
            </StyledMobileMenu>
        </Drawer>,
        root
    );
};

export { MenuDrawer };
