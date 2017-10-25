import Bind from './components/Bind';
import State from './components/State';

export const componentMap = {
  'amp-form': 'form', // Uses just `<form />` elements
  'amp-bind': Bind, // HoC to pass `[*]` attributes to children
  'amp-state': State, // Convenience component; prevents needing `dangerouslySetInnerHTML`
};

export default (componentName) => {
  const mappedComponent = componentMap[componentName];
  if (mappedComponent) return mappedComponent;
  return componentName;
};
