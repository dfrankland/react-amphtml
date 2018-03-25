import React from 'react';
import PropTypes from 'prop-types';
import { ON_ATTRIBUTE } from './Action';

export const BLACKLIST = [
  ON_ATTRIBUTE,
];

const boundAttributeRegExp = /^\[.*?\]$/;

const Bind = ({ children: RenderProp, ...props }) => {
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

export default Bind;
