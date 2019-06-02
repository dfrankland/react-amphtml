import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

export interface ScriptProps {
  extension: string;
  isCustomTemplate?: boolean;
  version?: string;
}

const Script: React.SFC<ScriptProps> = ({
  extension,
  isCustomTemplate,
  version,
}): ReactElement => (
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
