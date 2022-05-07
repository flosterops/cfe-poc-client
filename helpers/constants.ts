import { BreakPoints } from './responsive';

export const constants = {
    // TODO currently we have only one [width], but it will be breakpoint for desktop when we add mobile view
    getWidth: (value: BreakPoints): string => value + 'px',
    width: {
        wideDesktop: BreakPoints.wideDesktop + 'px',
        lgDesktop: BreakPoints.lgDesktop + 'px',
        desktop: BreakPoints.desktop + 'px',
        smallDesktop: BreakPoints.smallDesktop + 'px',
        tablet: BreakPoints.tablet + 'px',
        phone: BreakPoints.phone + 'px',
        smallPhone: BreakPoints.smallPhone + 'px',
    },
    maxWidthWithPadding: '1510px',
    virtualCurrency: {
        atlas: 'TWC',
    },
};
