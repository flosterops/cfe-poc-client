import { MenuPosition } from 'widgets/Mobile/MobileMenu';

function getMenuStyleByPosition(position: MenuPosition, visible: boolean): string {
    if (position === MenuPosition.right) {
        return `right: ${visible ? '0' : '-70%'};`;
    }
    return `left: ${visible ? '0' : '-70%'};`;
}

export { getMenuStyleByPosition };
