import { IAccountInfoModel } from 'models/account';
import { request } from 'helpers/basicAxios';
import { requestUrls } from 'helpers/requestUrls';

const fetchAccountInfo = async (): Promise<IAccountInfoModel> => {
    const response = await request.get(requestUrls.accountInfo());
    return response.data || {};
};

export { fetchAccountInfo };
