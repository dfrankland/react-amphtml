export const componentNameMap = {
  // `<amp-state />` is a component included in the `amp-bind` script
  // https://www.ampproject.org/docs/reference/components/amp-bind
  'amp-bind': ['amp-state'],
};

export default (componentName) => {
  const mappedComponent = componentNameMap[componentName];
  if (mappedComponent) return [componentName, ...mappedComponent];
  return [componentName];
};
