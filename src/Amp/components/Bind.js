import React from 'react';
import PropTypes from 'prop-types';
import { ON_ATTRIBUTE } from './Action';

export const BLACKLIST = [
  ON_ATTRIBUTE,
];

const boundAttributeRegExp = /^\[.*?\]$/;

const Bind = ({ children, ...props }) => {
  const boundAttributeProps = Object.keys(props).reduce(
    (allProps, prop) => ({
      ...allProps,
      [(
        BLACKLIST.includes(prop) || boundAttributeRegExp.test(prop) ? prop : `[${prop}]`
      )]: props[prop],
    }),
    {},
  );

  return React.cloneElement(children, boundAttributeProps);
};

Bind.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Bind;
