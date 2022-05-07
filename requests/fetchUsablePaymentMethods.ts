import { IAccountPaymentModel } from 'models/account';
import { request } from 'helpers/basicAxios';
import { requestUrls } from 'helpers/requestUrls';

const fetchUsablePaymentMethods = async (): Promise<IAccountPaymentModel[]> => {
    const response = await request.get(requestUrls.accountUsablePayments());
    return response.data?.payments || [];
};

export { fetchUsablePaymentMethods };
