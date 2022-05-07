import parser from 'fast-xml-parser';

const options = {
    attributeNamePrefix: '',
    attrNodeName: 'attr',
    ignoreAttributes: false,
};

export function parseXml(data: string): any {
    return parser.parse(data, options);
}
