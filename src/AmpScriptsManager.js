import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AmpScripts, { CONTEXT_KEY } from './AmpScripts';

const AmpScriptsManager = class extends Component {
  getChildContext() {
    return { [CONTEXT_KEY]: this.props.ampScripts };
  }

  render() {
    return React.Children.only(this.props.children);
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
