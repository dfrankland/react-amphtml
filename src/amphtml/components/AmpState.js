import React from 'react';
import PropTypes from 'prop-types';

const AmpState = ({ children, id }) => (
  <amp-state id={id}>
    <script
      type="application/json"
      dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
        __html: JSON.stringify(children),
      }}
    />
  </amp-state>
);

AmpState.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.string.isRequired,
};

export default AmpState;
