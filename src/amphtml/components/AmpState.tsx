import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import contextHelper from '../../lib/contextHelper';
import { CONTEXT_KEY } from '../../constants';

export interface AmpStateProps {
  children?: any;
  id?: string;
  src?: string;
}

const AmpState: React.FunctionComponent<AmpStateProps> = (
  { children, id, src },
  context,
): ReactElement => {
  contextHelper({ context, extension: 'amp-bind' });

  if (src) {
    // @ts-ignore
    return <amp-state id={id} src={src} />;
  }

  return (
    // @ts-ignore
    <amp-state id={id}>
      <script
        type="application/json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(children),
        }}
      />
      // @ts-ignore
    </amp-state>
  );
};

AmpState.propTypes = {
  id: PropTypes.string,
  children: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  src: PropTypes.string,
};

AmpState.contextTypes = {
  [CONTEXT_KEY]: PropTypes.shape({
    addExtension: PropTypes.func.isRequired,
  }),
};

AmpState.defaultProps = {
  id: '',
  children: null,
  src: undefined,
};

export default AmpState;
