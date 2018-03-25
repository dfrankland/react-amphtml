// This file is run by babel so `amphtml-validator-rules` is listed in
// `devDependencies`.
// eslint-disable-next-line import/no-extraneous-dependencies
const amphtmlValidatorRules = require('amphtml-validator-rules');
const { BLACKLIST } = require('./constants');

const rules = amphtmlValidatorRules.amp.validator.createRules();

const DUPLICATE_SPEC_NAME = 'default';

const duplicateTags = rules.tags.reduce(
  (cache, { tagName }) => ({
    ...cache,
    [tagName]: typeof cache[tagName] === 'number' ? cache[tagName] + 1 : 0,
  }),
  {},
);

module.exports = rules.tags.reduce(
  ({ dupes, tags, ...rest }, tag) => {
    const {
      tagName,
      specName: possibleSpecName,
      extensionSpec: possibleExtensionSpec,
    } = tag;

    const extensionSpec = possibleExtensionSpec || {};
    const specName = possibleSpecName || extensionSpec.name || DUPLICATE_SPEC_NAME;

    if (BLACKLIST[tagName]) {
      return {
        dupes,
        tags,
        ...rest,
      };
    }

    if (!duplicateTags[tagName]) {
      return {
        dupes,
        tags: [...tags, tag],
        ...rest,
      };
    }

    const newTagName = `${tagName}_${Buffer.from(specName).toString('hex')}`;

    return {
      dupes: {
        ...dupes,
        [tagName]: {
          ...dupes[tagName],
          [newTagName]: specName,
        },
      },
      tags: [
        ...tags,
        {
          ...tag,
          dupeName: newTagName,
          specName,
        },
      ],
      ...rest,
    };
  },
  {
    ...rules,
    dupes: {},
    tags: [],
  },
);
