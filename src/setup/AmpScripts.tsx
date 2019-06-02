import React, { ReactElement } from 'react';
import { Script, ScriptProps } from '../amphtml/amphtml';
import { AMP, Formats } from '../constants';

export default class AmpScripts {
  private scripts: Map<string, ReactElement>;

  public constructor(htmlFormat: Formats = AMP) {
    this.scripts = new Map([
      [htmlFormat, <Script key={htmlFormat} specName={htmlFormat} />],
    ]);
  }

  public addExtension({
    extension,
    version,
  }: {
    extension: ScriptProps['specName'];
    version?: Script['version'];
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
