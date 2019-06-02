declare module 'react-amphtml' {
  import * as amphtml from './dist/amphtml/amphtml';

  export default amphtml;
}

declare module 'react-amphtml/helpers' {
  import { Action, ActionProps, ActionOnProps } from './dist/helpers/Action';
  import { AmpBindProps, BindProps, Bind } from './dist/helpers/Bind';

  export { Action, ActionProps, ActionOnProps, AmpBindProps, BindProps, Bind };
}

declare module 'react-amphtml/setup' {
  import { AmpScripts } from './dist/setup/AmpScripts';
  import {
    AmpScriptsManagerContext,
    AmpScriptsManagerProps,
    AmpScriptsManager,
  } from './dist/setup/AmpScriptsManager';
  import headerBoilerPlate from './dist/setup/headerBoilerplate';

  export {
    AmpScripts,
    AmpScriptsManagerContext,
    AmpScriptsManagerProps,
    AmpScriptsManager,
    headerBoilerPlate,
  };
}
