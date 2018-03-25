import React from 'react';
import AmpScript from './AmpScript';

export const CONTEXT_KEY = '__react-amphtml-ampscripts__';

const AmpScripts = class {
  scripts = new Map([[null, 'https://cdn.ampproject.org/v0.js']]);

  addComponent(component) {
    this.scripts.set(component, `https://cdn.ampproject.org/v0/${component}-0.1.js`);
  }

  getScriptElements() {
    return [...this.scripts].map((
      ([component, script]) => <AmpScript key={script} customElement={component} src={script} />
    ));
  }
};

export default AmpScripts;
