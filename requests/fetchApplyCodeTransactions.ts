import { IApplyCodeTransactions } from 'models/account';
import { request } from 'helpers/basicAxios';
import { requestUrls } from 'helpers/requestUrls';

const fetchApplyCodeTransactions = async (): Promise<IApplyCodeTransactions[]> => {
    const response = await request.get(requestUrls.accountApplyCodeTransactions());
    return response.data?.transactions || [];
};

export { fetchApplyCodeTransactions };
