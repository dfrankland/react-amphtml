import React, { ReactElement, Component } from 'react';
import PropTypes from 'prop-types';
import AmpScripts from './AmpScripts';
import { CONTEXT_KEY } from '../constants';

export interface AmpScriptsManagerContext {
  [CONTEXT_KEY]: AmpScripts;
}

const AmpScriptsManager = class extends Component {
  public getChildContext(): AmpScriptsManagerContext {
    const { ampScripts } = this.props;
    return { [CONTEXT_KEY]: ampScripts };
  }

  public render(): ReactElement {
    const { children } = this.props;
    return React.Children.only(children);
  }
};

AmpScriptsManager.childContextTypes = {
  [CONTEXT_KEY]: PropTypes.instanceOf(AmpScripts).isRequired,
};

AmpScriptsManager.propTypes = {
  children: PropTypes.node.isRequired,
  ampScripts: PropTypes.instanceOf(AmpScripts).isRequired,
};

export default AmpScriptsManager;
