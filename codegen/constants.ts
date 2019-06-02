export const MANDATORY_COMPONENT_OVERRIDES: {
  [key: string]: boolean;
} = {
  Html: true,
};

export const COMPONENT_OVERRIDES: {
  [key: string]: boolean;
} = {
  AmpState: true,
  Script: true,
};

export const BLACKLIST: {
  [key: string]: boolean;
} = {
  '!DOCTYPE': true,
  $REFERENCE_POINT: true,
  'O:P': true,
};

export const DUPES_BLACKLIST: {
  [key: string]: boolean;
} = {
  HTML: true,
};

export const MISSING_SCRIPT_EXTENSIONS = [
  'amp-video',
  'amp-ad',
  'amp-ad-custom',
];
