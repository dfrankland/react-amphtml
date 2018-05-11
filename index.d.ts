
interface AmpStateProps {
    id: string
    src?: string
}

interface ActionProps {
    events: {
        [eventName: string]: string[]
    }
}

declare module 'react-amphtml' {
    var types: any

    export = types;
}

declare module 'react-amphtml/helpers' {
    import { Component } from 'react';

    export class Bind extends Component<any, any> { }
    export class Action extends Component<ActionProps, any> { }
}

declare module 'react-amphtml/setup' {
    import { Component } from 'react';

    export class AmpScripts {
        constructor(defaultHtml: string)

        addExtension(extension: string)
        getScriptElements(): Component[]

    }

    interface AmpScriptsManagerProps {
        ampScripts: AmpScripts[]
    }

    export class AmpScriptsManager extends Component<AmpScriptsManagerProps, any> {}

    export function headerBoilerplate(href: string)
}
