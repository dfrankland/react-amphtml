export const componentMap = {
  'amp-form': 'form', // Uses just `<form />` elements
};

export default (componentName) => {
  const mappedComponent = componentMap[componentName];
  if (mappedComponent) return mappedComponent;
  return componentName;
};
