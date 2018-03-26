import React from 'react';
import PropTypes from 'prop-types';
import contextHelper from '../lib/contextHelper';
import { CONTEXT_KEY } from '../constants';
import { ON_ATTRIBUTE } from './Action';

export const BLACKLIST = [
  ON_ATTRIBUTE,
];

const boundAttributeRegExp = /^\[.*?\]$/;

const Bind = ({ children: RenderProp, ...props }, context) => {
  contextHelper({ context, extension: 'amp-bind' });

  const boundAttributeProps = Object.entries(props).reduce(
    (allProps, [propsName, propValue]) => ({
      ...allProps,
      [(
        BLACKLIST.includes(propsName) || boundAttributeRegExp.test(propsName) ? (
          propsName
        ) : (
          `[${propsName}]`
        )
      )]: (
        propValue
      ),
    }),
    {},
  );

  return <RenderProp {...boundAttributeProps} />;
};

Bind.propTypes = {
  children: PropTypes.func.isRequired,
};

Bind.contextTypes = {
  [CONTEXT_KEY]: PropTypes.shape({
    addExtension: PropTypes.func.isRequired,
  }),
};

export default Bind;
