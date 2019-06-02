module.exports.MANDATORY_COMPONENT_OVERRIDES = {
  Html: true,
};

module.exports.COMPONENT_OVERRIDES = {
  AmpState: true,
  Script: true,
};

module.exports.BLACKLIST = {
  '!DOCTYPE': true,
  $REFERENCE_POINT: true,
  'O:P': true,
};

module.exports.DUPES_BLACKLIST = {
  HTML: true,
};

module.exports.MISSING_SCRIPT_EXTENSIONS = [
  'amp-video',
  'amp-ad',
  'amp-ad-custom'
];
