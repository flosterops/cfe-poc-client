export interface IAccountCreatedResponseModel {
    account: IAccountCreatedModel;
}

export interface IRegisterError {
    attr: {
        code: string;
        type: string;
    };
}

export interface IAccountCreatedModel {
    // TODO add status types
    status: string;
    emailAddress: string;
    accountId: number;
    storeToken: string;
    errors?: IRegisterError[];
}

export interface IRequestRegister {
    email: string;
    storeToken: string;
    accountId: number;
}
