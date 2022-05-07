import { IAccountPaymentTransactionsModel } from 'models/account';
import { request } from 'helpers/basicAxios';
import { requestUrls } from 'helpers/requestUrls';

const fetchAccountPayments = async (): Promise<IAccountPaymentTransactionsModel[]> => {
    const response = await request.get(requestUrls.accountPaymentTransactions());
    return response.data?.transactions || [];
};

export { fetchAccountPayments };
