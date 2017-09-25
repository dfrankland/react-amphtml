import React from 'react';
import AmpScript from './AmpScript';

export const CONTEXT_KEY = '__react-amphtml-ampscripts__';

const AmpScripts = class {
  scripts = new Set(['https://cdn.ampproject.org/v0.js']);

  addComponent(component) {
    this.scripts.add(`https://cdn.ampproject.org/v0/${component}-0.1.js`);
  }

  getScriptElements() {
    return [...this.scripts].map(
      script => <AmpScript key={script} src={script} />,
    );
  }
};

export default AmpScripts;
