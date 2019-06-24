import React, { ReactElement } from 'react';
import { Script, ScriptProps } from '../amphtml/amphtml';
import { AMP, AMP_SRCS, Formats } from '../constants';

export default class AmpScripts {
  private scripts: Map<string, ReactElement>;

  public constructor(htmlFormat: Formats = AMP) {
    this.scripts = new Map([
      [
        htmlFormat,
        <Script
          async
          key={htmlFormat}
          specName={htmlFormat}
          src={AMP_SRCS[htmlFormat]}
        />,
      ],
    ]);
  }

  public addExtension({
    extension,
    version,
  }: {
    extension: ScriptProps['specName'];
    version?: ScriptProps['version'];
  }): void {
    this.scripts.set(
      extension,
      <Script async key={extension} specName={extension} version={version} />,
    );
  }

  public getScriptElements(): ReactElement[] {
    return [...this.scripts.values()];
  }
}
