import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

export interface ScriptProps {
  src?: string;
  extension?: string;
  version?: string;
  isCustomTemplate?: boolean;
  id?: string;
  nonce?: string;
  type?: string;
}

const Script: React.FunctionComponent<ScriptProps> = ({
  src,
  extension,
  version,
  isCustomTemplate,
}): ReactElement | null => {
  if (!src && (!extension || !version)) return null;
  const props = src
    ? {}
    : {
        [`custom-${isCustomTemplate ? 'template' : 'element'}`]: extension,
      };
  return (
    <script
      async
      {...props}
      src={src || `https://cdn.ampproject.org/v0/${extension}-${version}.js`}
    />
  );
};

Script.defaultProps = {
  src: '',
  extension: '',
  version: 'latest',
  isCustomTemplate: false,
  id: undefined,
  nonce: undefined,
  type: undefined,
};

Script.propTypes = {
  src: PropTypes.string,
  extension: PropTypes.string,
  version: PropTypes.string,
  isCustomTemplate: PropTypes.bool,
  id: PropTypes.string,
  nonce: PropTypes.string,
  type: PropTypes.string,
};

export default Script;
