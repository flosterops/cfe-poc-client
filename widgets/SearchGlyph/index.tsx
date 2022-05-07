import React, { FunctionComponent, ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Column, Description, NavLink, Row, SearchIcon } from 'ui';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, FontSizeTypes, ISpaceTypes } from 'helpers/enums';
import { fontSize } from 'helpers/theme';
import { useDebounce } from 'helpers/useDebounce';
import { ILayout } from 'ui/Layout';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';
import config from './config.json';

function getSearchHref(channel: string, search: string): UrlObject {
    return { pathname: `/[channel]/search/[search]`, query: { channel, search } };
}

interface ISearchGlyph extends ISpaceTypes {
    defaultValue?: string;
    channel: string;
    width?: string;
}

const StyledSearch = styled.input<any>`
    width: ${(props): string => (props.visible ? props.width : '40px')};
    height: 100%;
    border: 0;
    border-bottom: 2px solid ${(props): string => (props.visible ? colors.yellow : 'transparent')};
    transition: all 0.3s ease;
    background: ${colors.black};
    color: ${colors.lightText};
    outline: none;
    ${fontSize({ fontSize: FontSizeTypes.m })}
    padding: ${(props): string => (props.visible ? '5px 12px 0 42px' : '0')};
    &:focus {
        border-color: ${colors.yellow};
    }
`;

const IconSearch = styled(SearchIcon)<any>`
    position: absolute;
    cursor: pointer;
    left: 0;
`;

const SearchResults = styled(Column)<ILayout>`
    position: absolute;
    top: 55px;
    z-index: 10;
`;

const SearchGlyph: FunctionComponent<ISearchGlyph> = ({
    width = '350px',
    channel,
    defaultValue = '',
    ...props
}: ISearchGlyph): ReactElement => {
    const [visible, setVisible] = useState<boolean>(!!defaultValue);
    const [value, setValue] = useState<string>(defaultValue);
    const [focused, setFocused] = useState<boolean>(false);
    const [results, setResults] = useState<string[]>([]);
    const [query, setQuery] = useState<string>('');
    const router = useRouter();
    const ref = useRef<HTMLInputElement | null>(null);
    const debouncedSearchTerm = useDebounce(value, 500);
    const href = getSearchHref(channel, query);

    useEffect((): void => {
        if (debouncedSearchTerm) {
            setResults(config as string[]);
        } else {
            setResults([]);
        }
    }, [debouncedSearchTerm]);

    useEffect((): void => {
        if (!focused && !value) {
            setVisible(false);
        }
    }, [focused]);

    useEffect((): void => {
        if (value) {
            const stringifyQuery = queryString.stringify({ search: value.replaceAll(' ', '+') });
            setQuery(stringifyQuery);
        }
    }, [value]);

    const onIconClick = (): void => {
        setVisible(true);
        if (ref) {
            ref.current?.focus();
        }
    };

    const handleKeyPress = (event: KeyboardEvent): void => {
        if (event.key === 'Enter') {
            router.push(href);
        }
    };

    const handleChange = (e: any): void => setValue(e.target.value);
    const handleBlur = (): void => {
        setTimeout((): void => {
            setResults([]);
            setVisible(!!value);
        }, 500);
    };

    const handleFocus = (): void => {
        setFocused(true);
        if (value) {
            setResults(config as string[]);
        }
    };

    return (
        <Row componentHeight="100%" ai={AlignItemsTypes.center} {...props}>
            <StyledSearch
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                value={value}
                disable={!visible}
                onChange={handleChange}
                width={width}
                type="text"
                visible={visible}
                ref={ref}
            />
            <IconSearch visible={visible} width={33} height={34} onClick={onIconClick} />
            {!!results.length && focused && (
                <SearchResults bg={colors.purpleMain} componentWidth="100%" padding="10px 15px">
                    <Column>
                        {results.map(
                            (result: string): ReactElement => {
                                return (
                                    <NavLink
                                        key={Math.random() * 1000}
                                        href={getSearchHref(channel, queryString.stringify({ search: result }))}
                                        margin="10px 0"
                                    >
                                        <Description fontSize={FontSizeTypes.m}>{result}</Description>
                                    </NavLink>
                                );
                            }
                        )}
                    </Column>
                    <NavLink margin="10px 0" href={href}>
                        <Description fontSize={FontSizeTypes.xs} color={colors.yellow}>
                            see all results
                        </Description>
                    </NavLink>
                </SearchResults>
            )}
        </Row>
    );
};

export { SearchGlyph };
