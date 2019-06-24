import * as amphtmlRules from 'amphtml-validator-rules';
import { BLACKLIST, DUPES_BLACKLIST } from './constants';

const DUPLICATE_SPEC_NAME = 'default';

interface DuplicateTags {
  [tag: string]: number;
}

const duplicateTags: DuplicateTags = amphtmlRules.tags.reduce(
  (cache: DuplicateTags, { tagName }: amphtmlRules.Tag): DuplicateTags => ({
    ...cache,
    [tagName]: typeof cache[tagName] === 'number' ? cache[tagName] + 1 : 0,
  }),
  {},
);

export interface NewTag extends amphtmlRules.Tag {
  dupeName?: string;
}

export interface NewAmphtmlRules extends amphtmlRules.IndexD {
  dupes: {
    [tagName: string]: {
      [newTagName: string]: string;
    };
  };
  tags: NewTag[];
  version: string;
}

const newAmphtmlRules: NewAmphtmlRules = amphtmlRules.tags.reduce(
  (acc: NewAmphtmlRules, tag: amphtmlRules.Tag): NewAmphtmlRules => {
    const {
      tagName,
      specName: possibleSpecName,
      extensionSpec: possibleExtensionSpec,
    } = tag;

    if (BLACKLIST[tagName]) {
      return acc;
    }

    if (DUPES_BLACKLIST[tagName] || !duplicateTags[tagName]) {
      acc.tags = acc.tags
        .filter(({ tagName: t }: { tagName: string }): boolean => t !== tagName)
        .concat(tag);
      return acc;
    }

    const extensionSpec = possibleExtensionSpec || { name: '' };
    const specName =
      possibleSpecName || extensionSpec.name || DUPLICATE_SPEC_NAME;

    const newTagName = `${tagName}_${Buffer.from(specName).toString('hex')}`;

    acc.dupes[tagName] = acc.dupes[tagName] || {};
    acc.dupes[tagName][newTagName] = specName;
    acc.tags.push({ ...tag, dupeName: newTagName, specName });

    return acc;
  },
  {
    ...amphtmlRules,
    dupes: {},
    tags: [],
  },
);

export default newAmphtmlRules;
