interface AmpStateProps {
  id: string;
  src?: string;
}

interface ActionProps {
  children: (props) => void;
  events: {
    [eventName: string]: string[];
  };
}

interface BindProps {
  children: (props) => void;
  [bindName: string]: any;
}

declare module 'react-amphtml' {
  const any: any;
  export = any;
}

declare module 'react-amphtml/helpers' {
  import { Component } from 'react';

  export class Bind extends Component<BindProps, {}> {}
  export class Action extends Component<ActionProps, {}> {}
}

declare module 'react-amphtml/setup' {
  import { Component } from 'react';

  export class AmpScripts {
    constructor(defaultHtml?: string);

    addExtension(extension: string);
    getScriptElements(): Component[];
  }

  interface AmpScriptsManagerProps {
    ampScripts: AmpScripts[];
  }

  export class AmpScriptsManager extends Component<
    AmpScriptsManagerProps,
    any
  > {}

  export function headerBoilerplate(href: string);
}
