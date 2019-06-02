import { CONTEXT_KEY } from '../constants';
import { AmpScriptsManagerContext } from '../setup/AmpScriptsManager';
import { ScriptProps } from '../amphtml/amphtml';

export default ({
  context,
  extension,
  version,
}: {
  context: AmpScriptsManagerContext;
  extension: ScriptProps['specName'];
  version?: string;
}): void => {
  if (
    typeof context === 'object' &&
    typeof context[CONTEXT_KEY] === 'object' &&
    typeof context[CONTEXT_KEY].addExtension === 'function'
  ) {
    context[CONTEXT_KEY].addExtension({ extension, version });
  }
};
