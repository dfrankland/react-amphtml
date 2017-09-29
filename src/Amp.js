import React from 'react';
import PropTypes from 'prop-types';
import amphtml from /* preval */ './amp-html';
import AmpScripts, { CONTEXT_KEY } from './AmpScripts';

const { builtins, extensions } = amphtml;

const getAmpComponent = ({ Component, addComponentToAmpScripts }) => {
  const AmpComponent = (props, context) => {
    if (
      addComponentToAmpScripts &&
      context &&
      context[CONTEXT_KEY] &&
      typeof context[CONTEXT_KEY].addComponent === 'function'
    ) {
      context[CONTEXT_KEY].addComponent(Component);
    }

    return <Component {...props} />;
  };

  AmpComponent.contextTypes = {
    [CONTEXT_KEY]: PropTypes.instanceOf(AmpScripts),
  };

  return AmpComponent;
};

const capitalize = (match, p1) => p1.toUpperCase();

const ampComponentReducer = ({ addComponentToAmpScripts }) => (allComponents, Component) => {
  const componentName = (
    Component
      .replace(/^amp-(.)/, capitalize)
      .replace(/-(.)/g, capitalize)
  );

  const AmpComponent = getAmpComponent({ Component, addComponentToAmpScripts });

  return {
    ...allComponents,
    [componentName]: AmpComponent,
  };
};

export default extensions.reduce(
  ampComponentReducer({ addComponentToAmpScripts: true }),
  builtins.reduce(
    ampComponentReducer({ addComponentToAmpScripts: false }),
    {},
  ),
);
