import Bind from './components/Bind';

export const componentMap = {
  'amp-form': 'form', // Uses just `<form />` elements
  'amp-bind': Bind, // HoC to pass `[*]` attributes to children
};

export default (componentName) => {
  const mappedComponent = componentMap[componentName];
  if (mappedComponent) return mappedComponent;
  return componentName;
};
