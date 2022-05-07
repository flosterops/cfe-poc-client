import React, { FunctionComponent, ReactElement } from 'react';
import { CoinButtonTypes } from 'helpers/coinButton';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, ComponentSizesTypes, FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import { Button, Description, Icon, Row } from 'ui';
import styled from 'styled-components';
import { IButton } from 'ui/Button';
import { ILayout } from 'ui/Layout';
import { fontSize, media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { Balance } from 'widgets/CoinButton/Balance';
import { getButtonColor, getButtonIcon } from 'widgets/CoinButton/helpers';

const PlusButton = styled(Row)<ILayout>``;

const StyledButton = styled(Button)<IButton & { borderColor: string }>`
    border-bottom: ${(props) => `4px solid ${props.borderColor}`};
    & button {
        height: 51px;
    }
    &:hover {
        & ${PlusButton} {
            background: ${colors.lightText};
        }
        border-bottom: 4px solid ${colors.lightText};
    }
`;

const BalanceContainer = styled(Row)<ILayout>`
    ${media.lessThan(BreakPoints.desktop)} {
        & p {
            ${fontSize({ fontSize: FontSizeTypes.s })}
        }
    }
    ${media.lessThan(BreakPoints.smallDesktop)} {
        display: flex;
        & p {
            ${fontSize({ fontSize: FontSizeTypes.s })}
        }
    }
    ${media.lessThan(BreakPoints.tablet)} {
        display: none;
    }
`;

interface ICoinButton {
    onClick?: () => void;
    type: CoinButtonTypes;
    balance?: number;
}

const CoinButton: FunctionComponent<ICoinButton> = ({
    onClick = () => undefined,
    type,
    balance,
}: ICoinButton): ReactElement => {
    const icon = getButtonIcon(type);
    const color = getButtonColor(type);
    return (
        <StyledButton
            color={colors.dark as string}
            onClick={onClick}
            componentSize={ComponentSizesTypes.auto}
            borderColor={color}
        >
            <Row componentHeight="55px" componentWidth="auto" padding="0 10px" ai={AlignItemsTypes.center}>
                <Icon icon={icon} alt={icon} />
                <BalanceContainer componentWidth="auto" ai={AlignItemsTypes.center}>
                    <Description margin="0 5px" fontSize={FontSizeTypes.xl}>
                        |
                    </Description>
                    <Balance color={color} balance={balance} />
                </BalanceContainer>
            </Row>

            <PlusButton
                bg={color}
                jc={JustifyContentTypes.center}
                ai={AlignItemsTypes.center}
                componentWidth="55px"
                componentHeight="55px"
            >
                <Description weight={WeightTypes.w700} fontSize={FontSizeTypes.xl} color={colors.black}>
                    +
                </Description>
            </PlusButton>
        </StyledButton>
    );
};

export { CoinButton };
