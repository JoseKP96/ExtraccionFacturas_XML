
import { InvoiceData } from '../types.ts';

const toXml = (obj: any, rootName: string, indent: string): string => {
    let xml = '';
    if (obj === null || obj === undefined) {
        return '';
    }

    if (Array.isArray(obj)) {
        obj.forEach(item => {
            xml += toXml(item, rootName, indent);
        });
        return xml;
    }

    xml += `${indent}<${rootName}>\n`;
    const childIndent = indent + '  ';

    if (typeof obj === 'object') {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                if (value === null || value === undefined) continue;

                // For lineItems array, use 'item' as the tag name for each object
                const childRootName = key === 'lineItems' ? 'item' : key;
                xml += toXml(value, childRootName, childIndent);
            }
        }
    } else {
        xml += `${childIndent}${String(obj)}\n`;
    }

    xml += `${indent}</${rootName}>\n`;
    return xml;
};

export const jsonToXml = (jsonData: InvoiceData): string => {
    let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlString += '<invoice>\n';

    for (const key in jsonData) {
        if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
            const value = (jsonData as any)[key];
            xmlString += toXml(value, key, '  ');
        }
    }

    xmlString += '</invoice>';
    return xmlString;
};
