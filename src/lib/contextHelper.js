import { CONTEXT_KEY } from '../constants';

export default ({ context, extension }) => {
  if (
    typeof context === 'object'
    && typeof context[CONTEXT_KEY] === 'object'
    && typeof context[CONTEXT_KEY].addExtension === 'function'
  ) {
    context[CONTEXT_KEY].addExtension(extension);
  }
};
