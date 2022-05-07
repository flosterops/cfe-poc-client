import { colors } from 'helpers/colors';
import { IBreadCrumb } from 'widgets/BreadCrumbs';

function getDefaultBreadCrumbValue(): IBreadCrumb {
    return { text: 'Glyph Store', href: '/' };
}

function getBreadCrumbChannel(channel: string): IBreadCrumb {
    return { text: channel, href: `/${channel}` };
}

function getBreadCrumbProduct(channel: string, productId: string): IBreadCrumb {
    return { text: 'Item Page', href: `/${channel}/product/${productId}` };
}

function getBreadCrumbSubcategory(channel: string, subcategory: string): IBreadCrumb {
    return { text: subcategory, href: `/${channel}/product/${subcategory}` };
}

function getBreadCrumbsLinks(channel?: string, productId?: string, subcategory?: string): IBreadCrumb[] {
    const links = [getDefaultBreadCrumbValue()] as IBreadCrumb[];
    if (!channel) {
        return links;
    }
    links.push(getBreadCrumbChannel(channel));
    if (productId) {
        links.push(getBreadCrumbProduct(channel, productId));
        return links;
    }
    if (subcategory) {
        links.push(getBreadCrumbSubcategory(channel, subcategory));
        return links;
    }
    return links;
}

function getLinkColor(length: number, index: number): string {
    if (length < 2) {
        return colors.lightText;
    }
    return index < 1 ? colors.dark : colors.lightText;
}

export { getBreadCrumbsLinks, getLinkColor };
