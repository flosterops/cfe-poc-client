import { colors } from 'helpers/colors';
import { CSSProperties } from 'react';

export const categoriesSelectStyles: any = {
    container: (styles: any) => ({
        ...styles,
        padding: '0',
        marginRight: '30px',
    }),
    control: (styles: any, state: any) => ({
        ...styles,
        backgroundColor: 'transparent',
        border: `none`,
        outline: 'none',
        minWidth: '132px',
        cursor: 'pointer',
        padding: '0',
        boxShadow: 'none',
        width: '100%',
        borderRadius: 0,
        '&:hover': {
            padding: '0',
            fontSize: '16px',
            opacity: 0.8,
        },
    }),
    option: (styles: CSSProperties) => ({
        ...styles,
        color: '#fff',
        width: 'auto',
        border: 'none',
        padding: '15px 5px',
        justifyContent: 'center',
        textTransform: 'uppercase',
        textAlign: 'center',
        cursor: 'pointer',
        '&:focus': {
            backgroundColor: colors.yellow,
            color: colors.dark,
            opacity: 0.8,
        },
        '&:hover': {
            backgroundColor: colors.yellow,
            color: colors.dark,
            opacity: 0.8,
        },
    }),
    singleValue: (styles: any, state: any) => ({
        ...styles,
        marginLeft: '0',
        color: state.isFocused ? colors.yellow : colors.lightText,
        width: 'auto',
        fontSize: '16px',
    }),
    indicatorSeparator: (styles: any) => ({ ...styles, display: 'none' }),
    valueContainer: (styles: any) => ({
        ...styles,
        padding: '0',
        width: 'auto',
        minWidth: '50px',
    }),
    menu: (styles: CSSProperties) => ({
        ...styles,
        width: '100%',
        backgroundColor: colors.purplePink,
        color: '#fff',
        borderRadius: 0,
    }),
    dropdownIndicator: (styles: any, state: any) => ({
        ...styles,
        padding: 0,
        color: state.isFocused ? colors.yellow : colors.lightText,
        '&:hover': {
            color: state.isFocused ? colors.yellow : colors.lightText,
        },
    }),
    placeholder: (styles: any, state: any) => ({
        ...styles,
        color: state.isFocused ? colors.yellow : colors.lightText,
    }),
};
