import React from 'react';
import PropTypes from 'prop-types';
import AmpScripts, { CONTEXT_KEY } from '../AmpScripts';
import amphtml from /* preval */ './amp-html';
import getMappedComponent from './getMappedComponent';

const { builtins, extensions } = amphtml;

const getAmpComponent = ({ component, addComponentToAmpScripts }) => {
  const AmpComponent = (props, context) => {
    if (
      addComponentToAmpScripts &&
      context &&
      context[CONTEXT_KEY] &&
      typeof context[CONTEXT_KEY].addComponent === 'function'
    ) {
      context[CONTEXT_KEY].addComponent(component);
    }

    const MappedComponent = getMappedComponent(component);

    return <MappedComponent {...props} />;
  };

  AmpComponent.contextTypes = {
    [CONTEXT_KEY]: PropTypes.instanceOf(AmpScripts),
  };

  return AmpComponent;
};

const capitalize = (match, p1) => p1.toUpperCase();

const ampComponentReducer = ({ addComponentToAmpScripts }) => (allComponents, component) => {
  const componentName = (
    component
      .replace(/^amp-(.)/, capitalize)
      .replace(/-(.)/g, capitalize)
  );

  const AmpComponent = getAmpComponent({ component, addComponentToAmpScripts });

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
