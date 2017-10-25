import React from 'react';
import PropTypes from 'prop-types';
import AmpScripts, { CONTEXT_KEY } from '../AmpScripts';
import amphtml from /* preval */ './amp-html';
import getMappedComponentNames from './getMappedComponentNames';
import getMappedComponent from './getMappedComponent';

const { builtins, extensions } = amphtml;

const capitalize = (match, p1) => p1.toUpperCase();

const ampComponentReducer = ({ addComponentToAmpScripts }) => (allComponents, component) => {
  const ampComponents = getMappedComponentNames(component).reduce(
    (allAmpComponents, nextMappedComponentName) => {
      const AmpComponent = (props, context) => {
        if (
          addComponentToAmpScripts &&
          context &&
          context[CONTEXT_KEY] &&
          typeof context[CONTEXT_KEY].addComponent === 'function'
        ) {
          context[CONTEXT_KEY].addComponent(nextMappedComponentName);
        }

        const MappedComponent = getMappedComponent(nextMappedComponentName);

        return <MappedComponent {...props} />;
      };

      AmpComponent.contextTypes = {
        [CONTEXT_KEY]: PropTypes.instanceOf(AmpScripts),
      };

      const componentName = (
        nextMappedComponentName
          .replace(/^amp-(.)/, capitalize)
          .replace(/-(.)/g, capitalize)
      );

      return {
        ...allAmpComponents,
        [componentName]: AmpComponent,
      };
    },
    {},
  );

  return {
    ...allComponents,
    ...ampComponents,
  };
};

export default extensions.reduce(
  ampComponentReducer({ addComponentToAmpScripts: true }),
  builtins.reduce(
    ampComponentReducer({ addComponentToAmpScripts: false }),
    {},
  ),
);
