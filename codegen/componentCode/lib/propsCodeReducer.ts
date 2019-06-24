import { TagAttr, AttrListAttr } from 'amphtml-validator-rules';
import newRules, { NewTag } from '../../rules';
import camelCase from './camelCase';
import { JSX_INTRINSICS } from '../../constants';

export interface PropsCode {
  propTypesCode: { [key: string]: string };
  defaultPropsCode: { [key: string]: string };
  propsInterfaceCode: { [key: string]: string };
}

interface TypeProp {
  propertyName: string;
  type: 'string' | 'boolean';
  propType: string;
  interfaceProperty: string;
  defaultProp?: string;
}

export default ({
  tagName,
  attrs,
  attrLists,
}: Pick<NewTag, 'tagName' | 'attrs' | 'attrLists'>): PropsCode =>
  [
    ...(attrs || []),
    ...(attrLists || []).reduce(
      (
        allAttrFromLists: AttrListAttr[],
        attrListName: string,
      ): AttrListAttr[] => [
        ...allAttrFromLists,
        ...(
          newRules.attrLists.find(
            ({ name }): boolean => name === attrListName,
          ) || { attrs: [] }
        ).attrs,
      ],
      [],
    ),
  ].reduce(
    (
      { propTypesCode, defaultPropsCode, propsInterfaceCode },
      attr: TagAttr | AttrListAttr,
    ): PropsCode => {
      const {
        name,
        value,
        // TODO: Use these as well
        // valueCasei,
        // blacklistedValueRegex,
        // valueUrl,
        // valueRegex,
        // valueProperties,
        // valueRegexCasei,
        mandatory: mandatoryAttr,
      } = attr;

      const isCustomElement = !JSX_INTRINSICS[camelCase(tagName)];
      if ((isCustomElement && name === 'style') || name === 'version') {
        return { propTypesCode, defaultPropsCode, propsInterfaceCode };
      }

      const type = ((): TypeProp => {
        const propertyName = JSON.stringify(name);
        const mandatoryPropType = mandatoryAttr ? '.isRequired' : '';
        const mandatoryType = mandatoryAttr ? '' : ' | undefined';
        if (!value) {
          return {
            propertyName,
            type: 'string',
            interfaceProperty: `string${mandatoryType}`,
            propType: `PropTypes.string${mandatoryPropType}`,
          };
        }

        if (value.length === 1 && value[0] === '') {
          return {
            propertyName,
            type: 'boolean',
            interfaceProperty: `boolean${mandatoryType}`,
            propType: `PropTypes.bool${mandatoryPropType}`,
            defaultProp: JSON.stringify(false),
          };
        }

        const [firstValue] = value;
        return {
          propertyName,
          type: 'string',
          interfaceProperty: `'${value.join("' | '")}'${mandatoryType}`,
          propType: `PropTypes.oneOf<'${value.join("' | '")}'>(${JSON.stringify(
            value,
          )})${mandatoryPropType}`,
          defaultProp: JSON.stringify(firstValue),
        };
      })();

      const newPropTypesCode = {
        ...propTypesCode,
        [type.propertyName]: type.propType,
      };

      const newDefaultPropsCode =
        mandatoryAttr || !type.defaultProp
          ? defaultPropsCode
          : {
              ...defaultPropsCode,
              [type.propertyName]: type.defaultProp,
            };

      const newPropsInterfaceCode = {
        ...propsInterfaceCode,
        [type.propertyName]: type.interfaceProperty,
      };

      return {
        propTypesCode: newPropTypesCode,
        defaultPropsCode: newDefaultPropsCode,
        propsInterfaceCode: newPropsInterfaceCode,
      };
    },
    {
      propTypesCode: {},
      defaultPropsCode: {},
      propsInterfaceCode: {},
    },
  );
