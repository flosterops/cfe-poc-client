import React, { ReactElement } from 'react';
import { Layout } from 'ui/Layout';
import { AlignItemsTypes } from 'helpers/enums';
import Select from 'react-select';
import { ISelectOptionsModel } from 'widgets/Form/Fields/SelectSearch';
import { sortSelectStyles } from './sortSelectStyles';

const options = [
    { value: 0, label: 'SORT ASC' },
    { value: 1, label: 'SORT DESC' },
];

export const SortDropdown = (): ReactElement => {
    // TODO need to change sorting on change
    const onChange = (value: ISelectOptionsModel): void => {};
    return (
        <Layout ai={AlignItemsTypes.flexEnd}>
            <Select
                options={options}
                defaultValue={options[0]}
                onChange={(value: unknown): void => onChange(value as ISelectOptionsModel)}
                styles={sortSelectStyles}
                isSearchable={false}
                isClearable={false}
            />
        </Layout>
    );
};
