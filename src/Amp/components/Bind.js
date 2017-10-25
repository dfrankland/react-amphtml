import React from 'react';
import PropTypes from 'prop-types';

const Bind = ({ children, ...props }) => {
  const boundAttributes = { ...props };

  const boundAttributeProps = Object.keys(boundAttributes).reduce(
    (allProps, prop) => ({
      [`[${prop}]`]: boundAttributes[prop],
    }),
    {},
  );

  return React.cloneElement(children, boundAttributeProps);
};

Bind.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Bind;
