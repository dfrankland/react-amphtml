import React from 'react';
import PropTypes from 'prop-types';

const AmpScript = ({ src }) => <script async src={src} />;

AmpScript.propTypes = {
  src: PropTypes.string.isRequired,
};

export default AmpScript;
