import kababCase from './kababCase';
import { AmpLayout } from 'amphtml-validator-rules';
import { PropsCode } from './propsCodeReducer';

export default (propsCode: PropsCode, layout?: AmpLayout) => {
  if (!layout) {
    return propsCode;
  }

  const { supportedLayouts } = layout;
  const layoutProps = supportedLayouts.map(kababCase).map(layout => `"${layout}"`);
  const layoutInterface = layoutProps.join(' | ');

  const { propTypesCode, defaultPropsCode, propsInterfaceCode } = propsCode;
  const layoutPropTypesCode = {
    layout: `PropTypes.oneOf<${layoutInterface}>([${layoutProps}])`,
    width: 'PropTypes.string',
    height: 'PropTypes.string',
  };
  const layoutInterfaceCode = {
    layout: `${layoutInterface} | undefined`,
    width: 'string | undefined',
    height: 'string | undefined',
  };

  return {
    propTypesCode: { ...propTypesCode, ...layoutPropTypesCode },
    defaultPropsCode,
    propsInterfaceCode: { ...propsInterfaceCode, ...layoutInterfaceCode },
  };
};
