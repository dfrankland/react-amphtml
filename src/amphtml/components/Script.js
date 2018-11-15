import React from 'react';
import PropTypes from 'prop-types';

const Script = ({ extension, isCustomTemplate }) => {
  return (
    <script
      async
      {...{ [`custom-${isCustomTemplate ? 'template' : 'element'}`]: extension }}
      src={`https://cdn.ampproject.org/v0/${extension}-${versionForExtension(extension)}.js`}
    />
  )
};

const versionForExtension = (extension) => {
  switch (extension) {
    case 'amp-mustache':
      return '0.2';
    default:
      return '0.1';
  }
}

Script.defaultProps = {
  isCustomTemplate: false,
};

Script.propTypes = {
  extension: PropTypes.string.isRequired,
  isCustomTemplate: PropTypes.bool,
};

export default Script;
