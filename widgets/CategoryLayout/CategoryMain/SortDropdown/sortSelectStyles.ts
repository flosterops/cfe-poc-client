import { colors } from 'helpers/colors';

export const sortSelectStyles = {
    control: (styles: any) => ({
        ...styles,
        backgroundColor: 'transparent',
        border: `none`,
        outline: 'none',
        minWidth: '150px',
        cursor: 'pointer',
        padding: '0 12px',
        boxShadow: 'none',
        width: '100%',
        '&:hover': {
            padding: '0 12px',
            fontSize: '16px',
        },
        '&:last-child': {
            borderColor: 'none',
        },
        '&:focus': {
            padding: '0 12px',
            borderColor: 'none',
        },
    }),
    singleValue: (styles: any) => ({
        ...styles,
        marginLeft: '0',
        color: colors.lightText,
        width: 'auto',
        fontSize: '16px',
    }),
    indicatorSeparator: (styles: any) => ({ ...styles, display: 'none' }),
    valueContainer: (styles: any) => ({ ...styles, padding: '0', width: 'auto', minWidth: '50px' }),
    dropdownIndicator: (styles: any) => ({ ...styles, padding: 0, color: colors.lightText }),
};
