import { IAuthTicketModel } from 'models/authTicket';
import { IAccountModel } from 'models/account';
import { parseXml } from 'helpers/parseXml';
import { requestUrls } from 'helpers/requestUrls';
import { configuredFetch } from 'helpers/configuredFetch';
import { IAccountCreatedResponseModel, IRequestRegister } from 'models/createdAccount';
import { IError } from 'ui/Error';

interface IRequestAuth {
    ticket: string;
    account: IAccountModel | null;
    token: string;
}

const getParseAuthTicket = (data: string): IAuthTicketModel => {
    const signature = data.slice(0, data.indexOf('<'));
    const xmlData = data.replace(signature, '');
    const { authTicket } = parseXml(xmlData);
    return { ...authTicket, account: { ...authTicket.account, email: authTicket.account.email['#text'] } };
};

const requestAuth = async (email: string, password: string): Promise<IRequestAuth & IError> => {
    const requestData =
        `username=${email}` +
        `&password=${password}` +
        '&channel=1001' +
        '&includeStoreToken=includeStoreToken' +
        '&accountStatus=accountStatus' +
        '&accountCurrency=accountCurrency ' +
        '&accountEntitlements=accountEntitlements';
    const response = await configuredFetch('POST', requestUrls.auth(), requestData);
    if (response.status !== 200) {
        return {
            status: response.status,
            message: 'Auth failed. Account data not found.',
            ticket: '',
            account: null,
            token: '',
        };
    }

    const responseString = await response.text();

    if (!responseString) {
        return {
            ticket: '',
            account: null,
            token: '',
            status: response.status,
            message: '',
        };
    }
    const authTicket = getParseAuthTicket(responseString);
    return {
        status: response.status,
        message: '',
        ticket: responseString,
        account: authTicket?.account,
        token: authTicket?.ticket?.storeToken,
    };
};

interface IRegisterResponseParsedModel {
    accountCreateResponse: IAccountCreatedResponseModel;
}

const requestRegister = async (
    email: string,
    password: string,
    channelId: string
): Promise<IRequestRegister & IError> => {
    const requestData = `<?xml version="1.0" encoding="UTF-8"?>
    <accountCreateRequest version="1.2">
        <account>
            <dateOfBirth>1994-12-31</dateOfBirth>
            <countryCode>US</countryCode>
            <emailAddress>${email}</emailAddress>
            <password>${password}</password>
            <languageCode>en_US</languageCode>
            <affiliateId>null</affiliateId>
            <optInChannels>
                <channel>reactor</channel>
            </optInChannels>
        </account>
    </accountCreateRequest>`;

    const response = await configuredFetch('POST', requestUrls.register(), requestData, {
        headers: { 'Content-Type': 'text/xml', 'X-GameServer-Channel': channelId },
    });
    const responseString = await response.text();
    const data: IRegisterResponseParsedModel = parseXml(responseString);
    const error = {
        status: data.accountCreateResponse.account.status || 200,
        message: (data.accountCreateResponse.account.errors as any)?.error?.attr?.code || '',
    };
    const { emailAddress, storeToken, accountId } = data.accountCreateResponse.account;
    return {
        status: error.status as any,
        message: error.message,
        email: emailAddress,
        storeToken: storeToken,
        accountId: accountId,
    } as IRequestRegister & IError;
};

export { requestAuth, getParseAuthTicket, requestRegister };
