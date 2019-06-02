import React, {
  ReactNode,
  Component,
  WeakValidationMap,
  ValidationMap,
} from 'react';
import PropTypes from 'prop-types';
import AmpScripts from './AmpScripts';
import { CONTEXT_KEY } from '../constants';

export interface AmpScriptsManagerContext {
  [CONTEXT_KEY]: AmpScripts;
}

export interface AmpScriptsManagerProps {
  children: ReactNode;
  ampScripts: AmpScripts;
}

export default class AmpScriptsManager extends Component<
  AmpScriptsManagerProps
> {
  public static childContextTypes: ValidationMap<AmpScriptsManagerContext>;

  public static propTypes: WeakValidationMap<AmpScriptsManagerProps>;

  public getChildContext(): AmpScriptsManagerContext {
    const { ampScripts } = this.props;
    return { [CONTEXT_KEY]: ampScripts };
  }

  public render(): ReactNode {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

AmpScriptsManager.childContextTypes = {
  [CONTEXT_KEY]: PropTypes.instanceOf(AmpScripts).isRequired,
};

AmpScriptsManager.propTypes = {
  children: PropTypes.node.isRequired,
  ampScripts: PropTypes.instanceOf(AmpScripts).isRequired,
};
