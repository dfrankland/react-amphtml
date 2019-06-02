import { ReactElement } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import contextHelper from '../lib/contextHelper';
import { CONTEXT_KEY } from '../constants';
import { ON_ATTRIBUTE } from './Action';
import { AmpScriptsManagerContext } from '../setup/AmpScriptsManager';

export const BLACKLIST = [ON_ATTRIBUTE];

const boundAttributeRegExp = /^data-amp-.*?$/;

export interface AmpBindProps {
  [boundAttribute: string]: string;
}

const Bind = (
  { children, ...props }: { children: (props: AmpBindProps) => ReactElement },
  context: AmpScriptsManagerContext,
): ReactElement => {
  contextHelper({ context, extension: 'amp-bind' });

  const boundAttributeProps = Object.entries(props).reduce(
    (
      allProps: AmpBindProps,
      [propsName, propValue]: [string, string],
    ): AmpBindProps => ({
      ...allProps,
      [BLACKLIST.includes(propsName) || boundAttributeRegExp.test(propsName)
        ? propsName
        : `data-amp-bind-${propsName}`]: propValue,
    }),
    {},
  );

  return children(boundAttributeProps);
};

Bind.propTypes = {
  children: PropTypes.func.isRequired,
};

Bind.contextTypes = {
  [CONTEXT_KEY]: PropTypes.shape({
    addExtension: PropTypes.func.isRequired,
  }),
};

export default Bind;
