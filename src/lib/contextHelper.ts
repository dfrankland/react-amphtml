import { CONTEXT_KEY } from '../constants';
import AmpScriptsManagerContext from '../setup/AmpScriptsManager';

export default ({
  context,
  extension,
  version,
}: {
  context: AmpScriptsManagerContext;
  extension: string;
  version: string;
}): void => {
  if (
    typeof context === 'object' &&
    typeof context[CONTEXT_KEY] === 'object' &&
    typeof context[CONTEXT_KEY].addExtension === 'function'
  ) {
    context[CONTEXT_KEY].addExtension({ extension, version });
  }
};
