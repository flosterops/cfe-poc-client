import { IAccountLinks } from 'models/account';
import { request } from 'helpers/basicAxios';
import { requestUrls } from 'helpers/requestUrls';

const fetchAccountLinks = async (): Promise<IAccountLinks[]> => {
    const response = await request.get(requestUrls.accountLinks());
    return response.data?.accountLinks || [];
};

export { fetchAccountLinks };
