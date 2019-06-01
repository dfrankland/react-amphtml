// TODO: Remove `{ Component }` when Rollup fixes its code splitting.
// Currently, this fixes an `React__default is undefined` error.
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import contextHelper from '../lib/contextHelper';
import { CONTEXT_KEY } from '../constants';
import { ON_ATTRIBUTE } from './Action';

export const BLACKLIST = [
  ON_ATTRIBUTE,
];

const boundAttributeRegExp = /^data-amp-.*?$/;

const Bind = ({ children, ...props }, context) => {
  contextHelper({ context, extension: 'amp-bind' });

  const boundAttributeProps = Object.entries(props).reduce(
    (allProps, [propsName, propValue]) => ({
      ...allProps,
      [(
        BLACKLIST.includes(propsName) || boundAttributeRegExp.test(propsName) ? (
          propsName
        ) : (
          `data-amp-bind-${propsName}`
        )
      )]: (
        propValue
      ),
    }),
    {},
  );

  return children(boundAttributeProps);
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
