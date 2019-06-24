export const CONTEXT_KEY = '__react-amphtml-ampscripts__';

export type Formats =
  | 'amphtml engine v0.js script'
  | 'amp4ads engine amp4ads-v0.js script';

export const AMP: Formats = 'amphtml engine v0.js script';
export const AMP4ADS: Formats = 'amp4ads engine amp4ads-v0.js script';

export interface AmpSrcs {
  'amphtml engine v0.js script': 'https://cdn.ampproject.org/v0.js';
  'amp4ads engine amp4ads-v0.js script': 'https://cdn.ampproject.org/amp4ads-v0.js';
}

export const AMP_SRCS: AmpSrcs = {
  [AMP]: 'https://cdn.ampproject.org/v0.js',
  [AMP4ADS]: 'https://cdn.ampproject.org/amp4ads-v0.js',
};
