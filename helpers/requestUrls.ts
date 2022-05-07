export enum Domains {
    trionWorlds = 'trionworlds.com',
    devOneGamigo = 'dev.one.gamigo.com',
    devTrionGamesPriv = 'dev.triongames.priv',
}

export enum Channels {
    auth = 'auth',
    commerce = 'commerce',
    wiremock = 'wiremock',
}

const requestUrls = {
    origin: (domain: string = Domains.devOneGamigo) => (channel: string = Channels.commerce): string =>
        `https://${channel}.${domain}`,

    auth: (): string => `${requestUrls.origin(Domains.trionWorlds)(Channels.auth)}/auth/v1_2`,

    register: (): string => `${requestUrls.origin()()}/api/v1_2/register-account.action`,

    touch: (): string => `${requestUrls.origin(Domains.trionWorlds)(Channels.auth)}/touch/v1_2`,

    channels: (): string => `${requestUrls.origin()(Channels.wiremock)}/v1_2/channels`,

    purchaseProduct: (): string => `${requestUrls.origin()(Channels.wiremock)}/api/commerce/v1_2/purchase.action`,

    accountEntitlements: (channel: string): string =>
        `${requestUrls.origin()(channel)}/api/account/v1_2/get-account-entitlements.action`,

    usablePaymentMethods: (): string => `${requestUrls.origin()()}/api/v1_2/commerce/get-usable-payment-methods`,

    tieredPaymentTypes: (accountId: number): string =>
        `${requestUrls.origin()()}/api/commerce/v1_2/get-tiered-payment-types.action?accountId=${accountId}&channelBranch=internal`,

    productQuery: (channel: string, productName: string): string =>
        `${requestUrls.origin(Domains.trionWorlds)(
            channel
        )}/search/v1_2/product-query?query=PLAT.CODE%3D${productName}&limitBy=1`,

    gameData: (channel: string): string =>
        `${requestUrls.origin()(Channels.wiremock)}/search/v1_2/get-product.action?channel=${channel}`,

    getProductByCategories: (channel: string, categories: string[]): string =>
        `${requestUrls.origin()(
            Channels.wiremock
        )}/search/v1_2/product-query.action?channel=${channel}&categories=${categories.join(',')}`,

    cart: (channel: string): string => `${requestUrls.origin()(Channels.wiremock)}/v1_2/cart?channel=${channel}`,

    categories: (channel: string): string =>
        `${requestUrls.origin()(Channels.wiremock)}/search/v1_2/categories.action?channel=${channel}`,
    accountInfo: (): string => `${requestUrls.origin()(Channels.wiremock)}/account/v1_2/account-info`,

    accountApplyCodeTransactions: (): string =>
        `${requestUrls.origin()(Channels.wiremock)}/account/v1_2/apply-code-transactions`,

    accountPaymentTransactions: (): string =>
        `${requestUrls.origin()(Channels.wiremock)}/account/v1_2/payment-transactions`,

    accountUsablePayments: (): string =>
        `${requestUrls.origin()(Channels.wiremock)}/account/v1_2/usable-payment-methods`,

    accountLinks: (): string => `${requestUrls.origin()(Channels.wiremock)}/account/v1_2/account-links`,

    paymentMethods: (): string =>
        `${requestUrls.origin()(Channels.wiremock)}/api/commerce/v1_2/getusablepaymentmethods.action`,

    verifyPurchase: (transactionId: string): string =>
        `${requestUrls.origin()(
            Channels.wiremock
        )}/api/commerce/v1_2/verifypurchase.action?transactionId=${transactionId}`,
};

export { requestUrls };
