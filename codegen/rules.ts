// This file is run by babel so `amphtml-validator-rules` is listed in
// `devDependencies`.
// eslint-disable-next-line import/no-extraneous-dependencies
import amphtmlValidatorRules from 'amphtml-validator-rules';
import { BLACKLIST, DUPES_BLACKLIST } from './constants';

const rules = amphtmlValidatorRules.amp.validator.createRules();

const DUPLICATE_SPEC_NAME = 'default';

const duplicateTags = rules.tags.reduce(
  (
    cache: {
      [key: string]: number;
    },
    { tagName }: { tagName: string },
  ): {
    [key: string]: number;
  } => ({
    ...cache,
    [tagName]: typeof cache[tagName] === 'number' ? cache[tagName] + 1 : 0,
  }),
  {},
);

const newRules: {
  dupes: {
    [tagName: string]: {
      [newTagName: string]: string;
    };
  };
  tags: {
    tagName: string;
    dupeName: string;
    attrs: number[];
    attrLists: number[];
    requiresExtension: string[] | null;
    extensionSpec: {
      name: string;
      version: string[];
      extensionType: string | null;
    } | null;
    mandatoryAncestorSuggestedAlternative: boolean;
  }[];
  internedStrings: string[];
  attrs: string[];
  directAttrLists: number[][];
} = rules.tags.reduce(
  (
    {
      dupes,
      tags,
      ...rest
    }: {
      dupes: {
        [tagName: string]: {
          [newTagName: string]: string;
        };
      };
      tags: {
        tagName: string;
        dupeName?: string;
        specName: string;
        [key: string]: any;
      }[];
    },
    tag: {
      tagName: string;
      specName: string;
      extensionSpec: {
        name: string;
        version: string[];
        extensionType: string | null;
      } | null;
    },
  ): {
    dupes: {
      [tagName: string]: {
        [newTagName: string]: string;
      };
    };
    tags: {
      tagName: string;
      dupeName?: string;
      specName: string;
      [key: string]: any;
    }[];
  } => {
    const {
      tagName,
      specName: possibleSpecName,
      extensionSpec: possibleExtensionSpec,
    } = tag;

    const extensionSpec = possibleExtensionSpec || { name: '' };
    const specName =
      possibleSpecName || extensionSpec.name || DUPLICATE_SPEC_NAME;

    if (BLACKLIST[tagName]) {
      return {
        dupes,
        tags,
        ...rest,
      };
    }

    if (DUPES_BLACKLIST[tagName] || !duplicateTags[tagName]) {
      return {
        dupes,
        tags: [
          ...tags.filter(
            ({ tagName: t }: { tagName: string }): boolean => t !== tagName,
          ),
          tag,
        ],
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

export default newRules;
