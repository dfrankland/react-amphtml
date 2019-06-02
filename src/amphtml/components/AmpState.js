import React from 'react';
import PropTypes from 'prop-types';
import contextHelper from '../../lib/contextHelper';
import { CONTEXT_KEY } from '../../constants';

const AmpState = ({ children, id, src }, context) => {
  contextHelper({ context, extension: 'amp-bind' });

  if (src) {
    return <amp-state id={id} src={src} />;
  }

  return (
    <amp-state id={id}>
      <script
        type="application/json"
        dangerouslySetInnerHTML={{
          // eslint-disable-line react/no-danger
          __html: JSON.stringify(children),
        }}
      />
    </amp-state>
  );
};

AmpState.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  src: PropTypes.string,
};

AmpState.contextTypes = {
  [CONTEXT_KEY]: PropTypes.shape({
    addExtension: PropTypes.func.isRequired,
  }),
};

AmpState.defaultProps = {
  children: null,
  src: null,
};

export default AmpState;
