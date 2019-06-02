import { CONTEXT_KEY } from '../constants';

export default ({ context, extension, version }) => {
  if (
    typeof context === 'object' &&
    typeof context[CONTEXT_KEY] === 'object' &&
    typeof context[CONTEXT_KEY].addExtension === 'function'
  ) {
    context[CONTEXT_KEY].addExtension({ extension, version });
  }
};
