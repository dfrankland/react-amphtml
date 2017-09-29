import { DOMProperty } from 'react-dom/lib/ReactInjection';
import { properties as DOMProperties } from 'react-dom/lib/DOMProperty';

// By default React limit the set of valid DOM elements and attributes
// (https://github.com/facebook/react/issues/140) this config whitelist
// Amp elements/attributes
export default () => {
  if (typeof DOMProperties.amp === 'undefined') {
    DOMProperty.injectDOMPropertyConfig({
      Properties: { amp: DOMProperty.MUST_USE_ATTRIBUTE },
      isCustomAttribute: attributeName => attributeName.startsWith('amp-'),
    });
  }
  if (typeof DOMProperties.customElement === 'undefined') {
    DOMProperty.injectDOMPropertyConfig({
      Properties: { customElement: DOMProperty.MUST_USE_ATTRIBUTE },
      isCustomAttribute: attributeName => attributeName === 'custom-element',
    });
  }
};
