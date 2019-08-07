import React, { ReactElement } from 'react';
import { Script, ScriptProps } from '../amphtml/amphtml';
import { getScriptSource } from '../amphtml/components/Script';
import { AMP, AMP_SRCS, Formats } from '../constants';

export default class AmpScripts {
  private scripts: Map<string, ScriptProps>;

  public constructor(htmlFormat: Formats = AMP) {
    this.scripts = new Map([
      [
        htmlFormat,
        {
          specName: htmlFormat,
          src: AMP_SRCS[htmlFormat],
        },
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
    this.scripts.set(extension, { specName: extension, version });
  }

  public getScripts(): string[] {
    return Array.from(this.scripts.values()).map(
      ({ specName, version, src }): string => {
        return getScriptSource({ extension: specName, version, src });
      },
    );
  }

  public getScriptElements(): ReactElement[] {
    return [...this.scripts.values()].map(
      ({ specName, version, src }): ReactElement => (
        <Script
          key={specName}
          src={src}
          specName={specName}
          version={version}
          async
        />
      ),
    );
  }
}
