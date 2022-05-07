import React, { ReactElement, ReactNode, ReactNodeArray, useRef, useState } from 'react';
import { Column, Icon, Row } from 'ui';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { ISpaceTypes } from 'helpers/enums';
import { IconTypes } from 'helpers/icons';

interface ICollapseProps extends ISpaceTypes {
    color?: string;
    heading: ReactNode;
    children: ReactNode | ReactNodeArray;
    visible?: false;
    icon?: ReactNode;
    componentHeight?: string;
}

const CollapseContent = styled.div`
    max-height: 0;
    overflow: hidden;
    box-sizing: border-box;
    transition: max-height 0.4s;
    width: 100%;
`;

const CollapseHeader = styled(Row)<ILayout>`
    display: flex;
    width: 100%;
    align-items: center;
    cursor: pointer;
`;

interface CollapseIconWrapper extends ILayout {
    visible: boolean;
    clicked: boolean;
}

function getAnimationStyles(visible: boolean, clicked: boolean): string {
    if (!clicked) {
        return '';
    }

    return visible ? 'transform: rotate(45deg)' : 'transform: rotate(0);';
}

const CollapseIconWrapper = styled(Row)<CollapseIconWrapper>`
    position: absolute;
    right: 0;
    display: flex;
    transition: all 0.2s ease;
    ${({ visible, clicked }) => getAnimationStyles(visible, clicked)}
`;

const Collapse = ({
    heading,
    children,
    visible = false,
    color,
    icon,
    componentHeight,
    ...props
}: ICollapseProps): ReactElement => {
    const [isVisible, setIsVisible] = useState<boolean>(visible);
    const [clicked, setClicked] = useState<boolean>(visible);
    const [height, setHeight] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);

    const visibleChange = (): void => {
        setIsVisible(!isVisible);

        if (height === 0 && ref?.current) {
            const scrollHeight = ref.current.scrollHeight;
            setHeight(scrollHeight);
        } else {
            setHeight(0);
        }

        if (!clicked) {
            setClicked(true);
        }
    };

    const HeadingComponent = heading instanceof Function ? heading(isVisible) : heading;
    const IconComponent = icon && icon instanceof Function ? icon(isVisible) : icon;
    const Children = children instanceof Function ? children(isVisible) : children;

    return (
        <Column bg={color} {...props}>
            <CollapseHeader componentHeight={componentHeight} componentWidth="100%" onClick={visibleChange}>
                {HeadingComponent}
                <CollapseIconWrapper componentWidth="auto" visible={isVisible} clicked={clicked}>
                    {icon ? IconComponent : <Icon icon={IconTypes.rightArrow} alt="collapse-arrow" />}
                </CollapseIconWrapper>
            </CollapseHeader>
            <CollapseContent ref={ref} style={{ maxHeight: height }}>
                <Column>{Children}</Column>
            </CollapseContent>
        </Column>
    );
};

export { Collapse };
