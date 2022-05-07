import { IAccountModel, IThirdPartyAccountModel } from 'models/account';

export interface IAuthTicketModel {
    account: IAccountModel;
    thirdPartyAccounts: IThirdPartyAccountModel;
    ticket: ITicketModel;
}

export interface ITicketModel {
    authenticatedWithMobileKey: boolean;
    channelId: number;
    downloadCookie: string;
    ipAddress: string;
    ipSensitivity: number;
    loginDate: string;
    mobileKeyAvailable: boolean;
    platformServerId: string;
    storeToken: string;
    ticketModifiedDate: string;
    attr: ITicketAttrModel;
}

export interface ITicketAttrModel {
    expiration: string;
}
