// TODO should we think and get element by attribute more easy way?
export function getElementByAttr(arr: any[], attrName: string, attrValue: any): any {
    if (!arr.find) {
        if ((arr as any)['attr'][attrName] === attrValue) {
            return arr;
        } else {
            throw Error(
                `You try to find attr [${attrName}] with value [${attrValue}], but there aren't parent element for that or it's not a array`
            );
        }
    }
    return arr.find((el: any): boolean => el['attr'][attrName] === attrValue);
}
