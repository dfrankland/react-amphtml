import React from 'react';
import { Script } from '../amphtml/amphtml';
import { AMP } from '../constants';

const AmpScripts = class {
  constructor(htmlFormat = AMP) {
    this.scripts = new Map([
      [htmlFormat, <Script key={htmlFormat} specName={htmlFormat} />],
    ]);
  }

  addExtension({ extension, version }) {
    this.scripts.set(
      extension,
      <Script key={extension} specName={extension} version={version} />,
    );
  }

  getScriptElements() {
    return [...this.scripts.values()];
  }
};

export default AmpScripts;
