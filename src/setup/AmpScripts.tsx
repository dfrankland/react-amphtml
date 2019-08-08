import React, { ReactElement } from 'react';
import { Script, ScriptProps } from '../amphtml/amphtml';
import { getScriptSource } from '../amphtml/components/Script';
import { AMP, AMP_SRCS, Formats } from '../constants';

export interface ScriptSource {
  src: string;
  extension: string;
}

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

  public getScripts(): ScriptSource[] {
    return Array.from(this.scripts.values()).map(
      ({ specName, version, src }): ScriptSource => {
        return {
          src: getScriptSource({ extension: specName, version, src }),
          extension: specName,
        };
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
