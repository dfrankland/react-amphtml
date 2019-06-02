import AmpScripts from '../setup/AmpScripts';
import { CONTEXT_KEY } from '../constants';

export default ({
  context,
  extension,
  version,
}: {
  context: {
    [key: string]: AmpScripts;
  };
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
