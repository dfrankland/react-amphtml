import React from 'react';
import PropTypes from 'prop-types';

const Script = ({ extension, isCustomTemplate }) => (
  <script
    async
    {...{ [`custom-${isCustomTemplate ? 'template' : 'element'}`]: extension }}
    src={`https://cdn.ampproject.org/v0/${extension}-0.1.js`}
  />
);

Script.defaultProps = {
  isCustomTemplate: false,
};

Script.propTypes = {
  extension: PropTypes.string.isRequired,
  isCustomTemplate: PropTypes.bool,
};

export default Script;
