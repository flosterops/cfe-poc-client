import React, { FunctionComponent, ReactElement } from 'react';
import { Column, Description, Row } from 'ui';
import styled from 'styled-components';
import { IDescription } from 'ui/Description';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';

interface IInfo {
    email: string;
    glyphTag: string;
}

const InfoTitle = styled(Description)<IDescription>`
    width: 30%;
`;

const Info: FunctionComponent<IInfo> = ({ email, glyphTag }: IInfo): ReactElement => {
    return (
        <Column componentHeight="100%" jc={JustifyContentTypes.center}>
            <Row mbottom="30px" ai={AlignItemsTypes.center}>
                <InfoTitle>Email</InfoTitle>
                <Description>{email}</Description>
            </Row>
            <Row ai={AlignItemsTypes.center}>
                <InfoTitle>Glyph Tag</InfoTitle>
                <Description>{glyphTag}</Description>
            </Row>
        </Column>
    );
};

export { Info };
