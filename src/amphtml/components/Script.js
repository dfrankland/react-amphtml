import React from 'react';
import PropTypes from 'prop-types';

const Script = ({ extension, isCustomTemplate, version }) => (
  <script
    async
    {...{ [`custom-${isCustomTemplate ? 'template' : 'element'}`]: extension }}
    src={`https://cdn.ampproject.org/v0/${extension}-${version}.js`}
  />
);

Script.defaultProps = {
  isCustomTemplate: false,
  version: 'latest',
};

Script.propTypes = {
  extension: PropTypes.string.isRequired,
  isCustomTemplate: PropTypes.bool,
  version: PropTypes.string,
};

export default Script;
