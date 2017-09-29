import React from 'react';
import PropTypes from 'prop-types';

const AmpScript = ({ src, customElement }) => (
  <script async custom-element={customElement} src={src} />
);

AmpScript.defaultProps = {
  customElement: null,
};

AmpScript.propTypes = {
  src: PropTypes.string.isRequired,
  customElement: PropTypes.string,
};

export default AmpScript;
