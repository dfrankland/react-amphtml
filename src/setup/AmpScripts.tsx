import React, { ReactElement } from 'react';
import { Script } from '../amphtml/amphtml';
import { AMP } from '../constants';

export default class AmpScripts {
  private scripts: Map<string, ReactElement>;

  public constructor(htmlFormat = AMP) {
    this.scripts = new Map([
      [htmlFormat, <Script key={htmlFormat} specName={htmlFormat} />],
    ]);
  }

  public addExtension({
    extension,
    version,
  }: {
    extension: string;
    version: string;
  }): void {
    this.scripts.set(
      extension,
      <Script key={extension} specName={extension} version={version} />,
    );
  }

  public getScriptElements(): ReactElement[] {
    return [...this.scripts.values()];
  }
}
