import React, { FunctionComponent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Column, Description, Icon, LightCart, Row } from 'ui';
import { IDescription } from 'ui/Description';
import { AlignItemsTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import { ILayout } from 'ui/Layout';
import { colors } from 'helpers/colors';
import config from './config.json';
import { IconTypes } from 'helpers/icons';
import { IAccountLinks } from 'models/account';

function getStatusText(status: boolean): string {
    return status ? 'Connected' : 'Not connected';
}

function getStatusColor(status: boolean): string {
    return status ? colors.green : colors.lightText;
}

function getLinkText(status: boolean): string {
    return status ? 'Unlink account' : 'Connect';
}

function getLinkColor(status: boolean): string {
    return status ? colors.lightPink : colors.yellow;
}

const Status = styled(Description)<IDescription>`
    font-size: 16px;
`;

const PlatformItem = styled(Row)<ILayout>`
    width: 180px;
`;

const Connect = styled(Row)<ILayout>`
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

interface IPlatform extends IAccountLinks {
    unlink: () => void;
    onLink: () => void;
}

const Platform: FunctionComponent<IPlatform> = ({ img, platform, status, unlink, onLink }: IPlatform): ReactElement => {
    const statusText = getStatusText(status);
    const statusColor = getStatusColor(status);
    const linkText = getLinkText(status);
    const linkColor = getLinkColor(status);

    const onUnlink = (): void => {
        if (status) {
            unlink();
        } else {
            onLink();
        }
    };

    return (
        <LightCart>
            <Row ai={AlignItemsTypes.center} componentWidth="auto">
                <PlatformItem componentWidth="100px" ai={AlignItemsTypes.center}>
                    <img src={img} alt={img} />
                </PlatformItem>
                <PlatformItem ai={AlignItemsTypes.center}>
                    <Description>{platform}</Description>
                </PlatformItem>
                <PlatformItem ai={AlignItemsTypes.center}>
                    <Status fontSize={FontSizeTypes.m} color={statusColor} weight={WeightTypes.w600}>
                        {statusText}
                    </Status>
                </PlatformItem>
            </Row>
            <Connect onClick={onUnlink} ai={AlignItemsTypes.center} componentWidth="auto">
                {!status && <Icon mright="3px" alt={IconTypes.connectAccount} icon={IconTypes.connectAccount} />}
                <Description color={linkColor}>{linkText}</Description>
            </Connect>
        </LightCart>
    );
};

interface ILinksConfigItem {
    id: string;
    img: string;
    platform: string;
    status: boolean;
}

interface ILinksConfig {
    subTitle: string;
}

interface ILinks {
    accountLinks: IAccountLinks[];
}

const Links: FunctionComponent<ILinks> = ({ accountLinks }: ILinks): ReactElement => {
    const { subTitle } = config as ILinksConfig;
    const [links, setLinks] = useState<IAccountLinks[]>(accountLinks);

    const unlink = (id: string): void => {
        const filteredLinks = links.map(
            (link: IAccountLinks): IAccountLinks => {
                if (link.id === id) {
                    return { ...link, status: false };
                }
                return link;
            }
        );
        setLinks(filteredLinks);
    };

    const onLink = (id: string): void => {
        const filteredLinks = links.map(
            (link: IAccountLinks): IAccountLinks => {
                if (link.id === id) {
                    return { ...link, status: true };
                }
                return link;
            }
        );
        setLinks(filteredLinks);
    };

    return (
        <Column componentHeight="100%">
            <Description margin="30px 0">{subTitle}</Description>
            {links.map(
                (link: ILinksConfigItem): ReactElement => {
                    return (
                        <Platform
                            key={link.id}
                            onLink={(): void => onLink(link.id)}
                            unlink={(): void => unlink(link.id)}
                            {...link}
                        />
                    );
                }
            )}
        </Column>
    );
};

export { Links };
