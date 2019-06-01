import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AmpScripts from './AmpScripts';
import { CONTEXT_KEY } from '../constants';

const AmpScriptsManager = class extends Component {
  getChildContext() {
    const { ampScripts } = this.props;
    return { [CONTEXT_KEY]: ampScripts };
  }

  render() {
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
