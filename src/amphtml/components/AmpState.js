import React from 'react';
import PropTypes from 'prop-types';
import contextHelper from '../../lib/contextHelper';
import { CONTEXT_KEY } from '../../constants';

const AmpState = ({ children, id }, context) => {
  contextHelper({ context, extension: 'amp-bind' });
  return (
    <amp-state id={id}>
      <script
        type="application/json"
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: JSON.stringify(children),
        }}
      />
    </amp-state>
  );
};

AmpState.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.string.isRequired,
};

AmpState.contextTypes = {
  [CONTEXT_KEY]: PropTypes.shape({
    addExtension: PropTypes.func.isRequired,
  }),
};

export default AmpState;
