import { readFileSync } from 'fs';
import { resolve as resolvePath } from 'path';
import newRules, { NewTag } from '../rules';
import {
  MANDATORY_COMPONENT_OVERRIDES,
  COMPONENT_OVERRIDES,
  BLACKLIST,
} from '../constants';
import tagNameToComponentName from '../tagNameToComponentName';
import propsCodeReducer from './lib/propsCodeReducer';
import mandatoryComponentOverrideTemplate from './templates/mandatoryComponentOverrideTemplate';
import componentOverrideTemplate from './templates/componentOverrideTemplate';
import componentTemplate from './templates/componentTemplate';

const EXTENSION_TYPE_CUSTOM_TEMPLATE = 'CUSTOM_TEMPLATE';

export default newRules.tags.reduce(
  (
    code: string,
    {
      tagName,
      dupeName,
      attrs,
      attrLists,
      requiresExtension,
      extensionSpec,
      mandatoryAncestorSuggestedAlternative,
    }: NewTag,
  ): string => {
    if (BLACKLIST[tagName] || mandatoryAncestorSuggestedAlternative)
      return code;

    const componentName = tagNameToComponentName(dupeName || tagName);

    if (MANDATORY_COMPONENT_OVERRIDES[tagNameToComponentName(tagName)]) {
      return mandatoryComponentOverrideTemplate({
        code,
        tagName,
        componentName,
      });
    }

    const propsCode = propsCodeReducer({ tagName, attrs, attrLists });

    const requiresExtensionContext = (Array.isArray(requiresExtension)
      ? requiresExtension
      : []
    ).reduce(
      (requiresExtensionContextCode, requiredExtension): string => `
        ${requiresExtensionContextCode}
        contextHelper({ context, extension: '${requiredExtension}', version: props.version });
      `,
      '',
    );

    const [extensionPropsGiven, extensionProps] =
      extensionSpec && typeof extensionSpec === 'object'
        ? [
            true,
            {
              extension: extensionSpec.name,
              isCustomTemplate:
                extensionSpec.extensionType === EXTENSION_TYPE_CUSTOM_TEMPLATE,
            },
          ]
        : [false, {}];

    const contextArgument = requiresExtensionContext
      ? ', context: AmpScriptsManagerContext'
      : '';

    if (COMPONENT_OVERRIDES[tagNameToComponentName(tagName)]) {
      return componentOverrideTemplate({
        code,
        tagName,
        componentName,
        dupeName,
        extensionSpec,
        extensionPropsGiven,
        extensionProps,
        requiresExtensionContext,
        contextArgument,
        propsCode,
      });
    }

    return componentTemplate({
      code,
      tagName,
      componentName,
      dupeName,
      requiresExtensionContext,
      contextArgument,
      propsCode,
    });
  },
  readFileSync(resolvePath(__dirname, './preamble.tsx')).toString('utf8'),
);
