import React from 'react';
import PropTypes from 'prop-types';

const Html = ({ children, format, lang }) => (
  <html {...{ [format]: '' }} lang={lang}>
    {children}
  </html>
);

Html.defaultProps = {
  children: null,
  format: 'amp',
  lang: 'en',
};

Html.propTypes = {
  children: PropTypes.node,
  format: PropTypes.oneOf(['amp', 'amp4ads', 'amp4email']),
  lang: PropTypes.string,
};

export default Html;
