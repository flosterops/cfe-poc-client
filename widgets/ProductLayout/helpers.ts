import toReactParser from 'html-react-parser';
import { FunctionComponent, ReactElement } from 'react';

function getPlaintTextReactElements(elements: any[]) {
    return elements.filter((element: ReactElement | string) => typeof element === 'string');
}

function findReactElementByType(elements: any, type: string) {
    if (Array.isArray(elements)) {
        return elements.find((element: any) => element.type === type);
    }

    return elements.type === type ? elements : null;
}

function getProductDescriptionComponent(elements: any) {
    return getPlaintTextReactElements(elements);
}

function getProductImageComponent(elements: any) {
    const divElements = findReactElementByType(elements, 'div');
    return findReactElementByType(divElements.props.children, 'img');
}

function getProductIncludesComponent(elements: any) {
    return findReactElementByType(elements, 'ul');
}

interface IProductLayoutComponents {
    ProductImage: FunctionComponent<{}>;
    ProductDescriptionElements: string[];
    ProductIncludes: FunctionComponent<{}>;
}

function getProductLayoutFromParser(data: string): IProductLayoutComponents | null {
    if (!data) {
        return null;
    }

    const reactProductElements = toReactParser(data);
    const ProductImage = getProductImageComponent(reactProductElements);
    const ProductDescriptionElements = getProductDescriptionComponent(reactProductElements);
    const ProductIncludes = getProductIncludesComponent(reactProductElements);

    return { ProductImage, ProductDescriptionElements, ProductIncludes };
}

export { getProductLayoutFromParser };
