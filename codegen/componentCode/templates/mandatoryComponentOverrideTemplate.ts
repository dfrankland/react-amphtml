import tagNameToComponentName from '../../tagNameToComponentName';

export default ({
  code,
  tagName,
  componentName,
}: {
  code: string;
  tagName: string;
  componentName: string;
}): string => {
  const componentOverrideName = `${componentName}Override`;
  const componentOverrideFileName = tagNameToComponentName(tagName);
  return `
    ${code}
    import ${componentOverrideName} from './components/${componentOverrideFileName}';
    export const ${componentName} = ${componentOverrideName};
  `;
};
