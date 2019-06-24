/* eslint-disable @typescript-eslint/no-unused-vars, import/no-unresolved, import/extensions */

// TODO: Remove `{ Component }` when Rollup fixes its code splitting.
// Currently, this fixes an `React__default is undefined` error.
// @ts-ignore
import React, { Component, ReactNode } from 'react';
// @ts-ignore
import PropTypes from 'prop-types';

// These are relative to the `src/amphtml/amphtml.js` file
// @ts-ignore
import { CONTEXT_KEY } from '../constants';
// @ts-ignore
import contextHelper from '../lib/contextHelper';
// @ts-ignore
import { AmpScriptsManagerContext } from '../setup/AmpScriptsManager';

// @ts-ignore
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// @ts-ignore
const REACT_AMPHTML_CONTEXT = {
  [CONTEXT_KEY]: PropTypes.shape({
    addExtension: PropTypes.func.isRequired,
  }),
};

// The following were all copied from the global JSX IntrinsicElements
// interface.
// The properties of the interface were copied here and then had a regex replace
// run over all of them to make them into actual types:
//
// Find: ^"?([a-z].*?)"?:.*;
//
// Replace: // @ts-ignore\nexport type JSXIntrinsicElements$1 = JSX.IntrinsicElements['$1'];

// HTML
// @ts-ignore
export type JSXIntrinsicElementsa = JSX.IntrinsicElements['a'];
// @ts-ignore
export type JSXIntrinsicElementsabbr = JSX.IntrinsicElements['abbr'];
// @ts-ignore
export type JSXIntrinsicElementsaddress = JSX.IntrinsicElements['address'];
// @ts-ignore
export type JSXIntrinsicElementsarea = JSX.IntrinsicElements['area'];
// @ts-ignore
export type JSXIntrinsicElementsarticle = JSX.IntrinsicElements['article'];
// @ts-ignore
export type JSXIntrinsicElementsaside = JSX.IntrinsicElements['aside'];
// @ts-ignore
export type JSXIntrinsicElementsaudio = JSX.IntrinsicElements['audio'];
// @ts-ignore
export type JSXIntrinsicElementsb = JSX.IntrinsicElements['b'];
// @ts-ignore
export type JSXIntrinsicElementsbase = JSX.IntrinsicElements['base'];
// @ts-ignore
export type JSXIntrinsicElementsbdi = JSX.IntrinsicElements['bdi'];
// @ts-ignore
export type JSXIntrinsicElementsbdo = JSX.IntrinsicElements['bdo'];
// @ts-ignore
export type JSXIntrinsicElementsbig = JSX.IntrinsicElements['big'];
// @ts-ignore
export type JSXIntrinsicElementsblockquote = JSX.IntrinsicElements['blockquote'];
// @ts-ignore
export type JSXIntrinsicElementsbody = JSX.IntrinsicElements['body'];
// @ts-ignore
export type JSXIntrinsicElementsbr = JSX.IntrinsicElements['br'];
// @ts-ignore
export type JSXIntrinsicElementsbutton = JSX.IntrinsicElements['button'];
// @ts-ignore
export type JSXIntrinsicElementscanvas = JSX.IntrinsicElements['canvas'];
// @ts-ignore
export type JSXIntrinsicElementscaption = JSX.IntrinsicElements['caption'];
// @ts-ignore
export type JSXIntrinsicElementscite = JSX.IntrinsicElements['cite'];
// @ts-ignore
export type JSXIntrinsicElementscode = JSX.IntrinsicElements['code'];
// @ts-ignore
export type JSXIntrinsicElementscol = JSX.IntrinsicElements['col'];
// @ts-ignore
export type JSXIntrinsicElementscolgroup = JSX.IntrinsicElements['colgroup'];
// @ts-ignore
export type JSXIntrinsicElementsdata = JSX.IntrinsicElements['data'];
// @ts-ignore
export type JSXIntrinsicElementsdatalist = JSX.IntrinsicElements['datalist'];
// @ts-ignore
export type JSXIntrinsicElementsdd = JSX.IntrinsicElements['dd'];
// @ts-ignore
export type JSXIntrinsicElementsdel = JSX.IntrinsicElements['del'];
// @ts-ignore
export type JSXIntrinsicElementsdetails = JSX.IntrinsicElements['details'];
// @ts-ignore
export type JSXIntrinsicElementsdfn = JSX.IntrinsicElements['dfn'];
// @ts-ignore
export type JSXIntrinsicElementsdialog = JSX.IntrinsicElements['dialog'];
// @ts-ignore
export type JSXIntrinsicElementsdiv = JSX.IntrinsicElements['div'];
// @ts-ignore
export type JSXIntrinsicElementsdl = JSX.IntrinsicElements['dl'];
// @ts-ignore
export type JSXIntrinsicElementsdt = JSX.IntrinsicElements['dt'];
// @ts-ignore
export type JSXIntrinsicElementsem = JSX.IntrinsicElements['em'];
// @ts-ignore
export type JSXIntrinsicElementsembed = JSX.IntrinsicElements['embed'];
// @ts-ignore
export type JSXIntrinsicElementsfieldset = JSX.IntrinsicElements['fieldset'];
// @ts-ignore
export type JSXIntrinsicElementsfigcaption = JSX.IntrinsicElements['figcaption'];
// @ts-ignore
export type JSXIntrinsicElementsfigure = JSX.IntrinsicElements['figure'];
// @ts-ignore
export type JSXIntrinsicElementsfooter = JSX.IntrinsicElements['footer'];
// @ts-ignore
export type JSXIntrinsicElementsform = JSX.IntrinsicElements['form'];
// @ts-ignore
export type JSXIntrinsicElementsh1 = JSX.IntrinsicElements['h1'];
// @ts-ignore
export type JSXIntrinsicElementsh2 = JSX.IntrinsicElements['h2'];
// @ts-ignore
export type JSXIntrinsicElementsh3 = JSX.IntrinsicElements['h3'];
// @ts-ignore
export type JSXIntrinsicElementsh4 = JSX.IntrinsicElements['h4'];
// @ts-ignore
export type JSXIntrinsicElementsh5 = JSX.IntrinsicElements['h5'];
// @ts-ignore
export type JSXIntrinsicElementsh6 = JSX.IntrinsicElements['h6'];
// @ts-ignore
export type JSXIntrinsicElementshead = JSX.IntrinsicElements['head'];
// @ts-ignore
export type JSXIntrinsicElementsheader = JSX.IntrinsicElements['header'];
// @ts-ignore
export type JSXIntrinsicElementshgroup = JSX.IntrinsicElements['hgroup'];
// @ts-ignore
export type JSXIntrinsicElementshr = JSX.IntrinsicElements['hr'];
// @ts-ignore
export type JSXIntrinsicElementshtml = JSX.IntrinsicElements['html'];
// @ts-ignore
export type JSXIntrinsicElementsi = JSX.IntrinsicElements['i'];
// @ts-ignore
export type JSXIntrinsicElementsiframe = JSX.IntrinsicElements['iframe'];
// @ts-ignore
export type JSXIntrinsicElementsimg = JSX.IntrinsicElements['img'];
// @ts-ignore
export type JSXIntrinsicElementsinput = JSX.IntrinsicElements['input'];
// @ts-ignore
export type JSXIntrinsicElementsins = JSX.IntrinsicElements['ins'];
// @ts-ignore
export type JSXIntrinsicElementskbd = JSX.IntrinsicElements['kbd'];
// @ts-ignore
export type JSXIntrinsicElementskeygen = JSX.IntrinsicElements['keygen'];
// @ts-ignore
export type JSXIntrinsicElementslabel = JSX.IntrinsicElements['label'];
// @ts-ignore
export type JSXIntrinsicElementslegend = JSX.IntrinsicElements['legend'];
// @ts-ignore
export type JSXIntrinsicElementsli = JSX.IntrinsicElements['li'];
// @ts-ignore
export type JSXIntrinsicElementslink = JSX.IntrinsicElements['link'];
// @ts-ignore
export type JSXIntrinsicElementsmain = JSX.IntrinsicElements['main'];
// @ts-ignore
export type JSXIntrinsicElementsmap = JSX.IntrinsicElements['map'];
// @ts-ignore
export type JSXIntrinsicElementsmark = JSX.IntrinsicElements['mark'];
// @ts-ignore
export type JSXIntrinsicElementsmenu = JSX.IntrinsicElements['menu'];
// @ts-ignore
export type JSXIntrinsicElementsmenuitem = JSX.IntrinsicElements['menuitem'];
// @ts-ignore
export type JSXIntrinsicElementsmeta = JSX.IntrinsicElements['meta'];
// @ts-ignore
export type JSXIntrinsicElementsmeter = JSX.IntrinsicElements['meter'];
// @ts-ignore
export type JSXIntrinsicElementsnav = JSX.IntrinsicElements['nav'];
// @ts-ignore
export type JSXIntrinsicElementsnoindex = JSX.IntrinsicElements['noindex'];
// @ts-ignore
export type JSXIntrinsicElementsnoscript = JSX.IntrinsicElements['noscript'];
// @ts-ignore
export type JSXIntrinsicElementsobject = JSX.IntrinsicElements['object'];
// @ts-ignore
export type JSXIntrinsicElementsol = JSX.IntrinsicElements['ol'];
// @ts-ignore
export type JSXIntrinsicElementsoptgroup = JSX.IntrinsicElements['optgroup'];
// @ts-ignore
export type JSXIntrinsicElementsoption = JSX.IntrinsicElements['option'];
// @ts-ignore
export type JSXIntrinsicElementsoutput = JSX.IntrinsicElements['output'];
// @ts-ignore
export type JSXIntrinsicElementsp = JSX.IntrinsicElements['p'];
// @ts-ignore
export type JSXIntrinsicElementsparam = JSX.IntrinsicElements['param'];
// @ts-ignore
export type JSXIntrinsicElementspicture = JSX.IntrinsicElements['picture'];
// @ts-ignore
export type JSXIntrinsicElementspre = JSX.IntrinsicElements['pre'];
// @ts-ignore
export type JSXIntrinsicElementsprogress = JSX.IntrinsicElements['progress'];
// @ts-ignore
export type JSXIntrinsicElementsq = JSX.IntrinsicElements['q'];
// @ts-ignore
export type JSXIntrinsicElementsrp = JSX.IntrinsicElements['rp'];
// @ts-ignore
export type JSXIntrinsicElementsrt = JSX.IntrinsicElements['rt'];
// @ts-ignore
export type JSXIntrinsicElementsruby = JSX.IntrinsicElements['ruby'];
// @ts-ignore
export type JSXIntrinsicElementss = JSX.IntrinsicElements['s'];
// @ts-ignore
export type JSXIntrinsicElementssamp = JSX.IntrinsicElements['samp'];
// @ts-ignore
export type JSXIntrinsicElementsscript = JSX.IntrinsicElements['script'];
// @ts-ignore
export type JSXIntrinsicElementssection = JSX.IntrinsicElements['section'];
// @ts-ignore
export type JSXIntrinsicElementsselect = JSX.IntrinsicElements['select'];
// @ts-ignore
export type JSXIntrinsicElementssmall = JSX.IntrinsicElements['small'];
// @ts-ignore
export type JSXIntrinsicElementssource = JSX.IntrinsicElements['source'];
// @ts-ignore
export type JSXIntrinsicElementsspan = JSX.IntrinsicElements['span'];
// @ts-ignore
export type JSXIntrinsicElementsstrong = JSX.IntrinsicElements['strong'];
// @ts-ignore
export type JSXIntrinsicElementsstyle = JSX.IntrinsicElements['style'];
// @ts-ignore
export type JSXIntrinsicElementssub = JSX.IntrinsicElements['sub'];
// @ts-ignore
export type JSXIntrinsicElementssummary = JSX.IntrinsicElements['summary'];
// @ts-ignore
export type JSXIntrinsicElementssup = JSX.IntrinsicElements['sup'];
// @ts-ignore
export type JSXIntrinsicElementstable = JSX.IntrinsicElements['table'];
// @ts-ignore
export type JSXIntrinsicElementstemplate = JSX.IntrinsicElements['template'];
// @ts-ignore
export type JSXIntrinsicElementstbody = JSX.IntrinsicElements['tbody'];
// @ts-ignore
export type JSXIntrinsicElementstd = JSX.IntrinsicElements['td'];
// @ts-ignore
export type JSXIntrinsicElementstextarea = JSX.IntrinsicElements['textarea'];
// @ts-ignore
export type JSXIntrinsicElementstfoot = JSX.IntrinsicElements['tfoot'];
// @ts-ignore
export type JSXIntrinsicElementsth = JSX.IntrinsicElements['th'];
// @ts-ignore
export type JSXIntrinsicElementsthead = JSX.IntrinsicElements['thead'];
// @ts-ignore
export type JSXIntrinsicElementstime = JSX.IntrinsicElements['time'];
// @ts-ignore
export type JSXIntrinsicElementstitle = JSX.IntrinsicElements['title'];
// @ts-ignore
export type JSXIntrinsicElementstr = JSX.IntrinsicElements['tr'];
// @ts-ignore
export type JSXIntrinsicElementstrack = JSX.IntrinsicElements['track'];
// @ts-ignore
export type JSXIntrinsicElementsu = JSX.IntrinsicElements['u'];
// @ts-ignore
export type JSXIntrinsicElementsul = JSX.IntrinsicElements['ul'];
// @ts-ignore
export type JSXIntrinsicElementsvar = JSX.IntrinsicElements['var'];
// @ts-ignore
export type JSXIntrinsicElementsvideo = JSX.IntrinsicElements['video'];
// @ts-ignore
export type JSXIntrinsicElementswbr = JSX.IntrinsicElements['wbr'];
// @ts-ignore
export type JSXIntrinsicElementswebview = JSX.IntrinsicElements['webview'];

// SVG
// @ts-ignore
export type JSXIntrinsicElementssvg = JSX.IntrinsicElements['svg'];

// @ts-ignore
export type JSXIntrinsicElementsanimate = JSX.IntrinsicElements['animate']; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
// @ts-ignore
export type JSXIntrinsicElementsanimateMotion = JSX.IntrinsicElements['animateMotion'];
// @ts-ignore
export type JSXIntrinsicElementsanimateTransform = JSX.IntrinsicElements['animateTransform']; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
// @ts-ignore
export type JSXIntrinsicElementscircle = JSX.IntrinsicElements['circle'];
// @ts-ignore
export type JSXIntrinsicElementsclipPath = JSX.IntrinsicElements['clipPath'];
// @ts-ignore
export type JSXIntrinsicElementsdefs = JSX.IntrinsicElements['defs'];
// @ts-ignore
export type JSXIntrinsicElementsdesc = JSX.IntrinsicElements['desc'];
// @ts-ignore
export type JSXIntrinsicElementsellipse = JSX.IntrinsicElements['ellipse'];
// @ts-ignore
export type JSXIntrinsicElementsfeBlend = JSX.IntrinsicElements['feBlend'];
// @ts-ignore
export type JSXIntrinsicElementsfeColorMatrix = JSX.IntrinsicElements['feColorMatrix'];
// @ts-ignore
export type JSXIntrinsicElementsfeComponentTransfer = JSX.IntrinsicElements['feComponentTransfer'];
// @ts-ignore
export type JSXIntrinsicElementsfeComposite = JSX.IntrinsicElements['feComposite'];
// @ts-ignore
export type JSXIntrinsicElementsfeConvolveMatrix = JSX.IntrinsicElements['feConvolveMatrix'];
// @ts-ignore
export type JSXIntrinsicElementsfeDiffuseLighting = JSX.IntrinsicElements['feDiffuseLighting'];
// @ts-ignore
export type JSXIntrinsicElementsfeDisplacementMap = JSX.IntrinsicElements['feDisplacementMap'];
// @ts-ignore
export type JSXIntrinsicElementsfeDistantLight = JSX.IntrinsicElements['feDistantLight'];
// @ts-ignore
export type JSXIntrinsicElementsfeDropShadow = JSX.IntrinsicElements['feDropShadow'];
// @ts-ignore
export type JSXIntrinsicElementsfeFlood = JSX.IntrinsicElements['feFlood'];
// @ts-ignore
export type JSXIntrinsicElementsfeFuncA = JSX.IntrinsicElements['feFuncA'];
// @ts-ignore
export type JSXIntrinsicElementsfeFuncB = JSX.IntrinsicElements['feFuncB'];
// @ts-ignore
export type JSXIntrinsicElementsfeFuncG = JSX.IntrinsicElements['feFuncG'];
// @ts-ignore
export type JSXIntrinsicElementsfeFuncR = JSX.IntrinsicElements['feFuncR'];
// @ts-ignore
export type JSXIntrinsicElementsfeGaussianBlur = JSX.IntrinsicElements['feGaussianBlur'];
// @ts-ignore
export type JSXIntrinsicElementsfeImage = JSX.IntrinsicElements['feImage'];
// @ts-ignore
export type JSXIntrinsicElementsfeMerge = JSX.IntrinsicElements['feMerge'];
// @ts-ignore
export type JSXIntrinsicElementsfeMergeNode = JSX.IntrinsicElements['feMergeNode'];
// @ts-ignore
export type JSXIntrinsicElementsfeMorphology = JSX.IntrinsicElements['feMorphology'];
// @ts-ignore
export type JSXIntrinsicElementsfeOffset = JSX.IntrinsicElements['feOffset'];
// @ts-ignore
export type JSXIntrinsicElementsfePointLight = JSX.IntrinsicElements['fePointLight'];
// @ts-ignore
export type JSXIntrinsicElementsfeSpecularLighting = JSX.IntrinsicElements['feSpecularLighting'];
// @ts-ignore
export type JSXIntrinsicElementsfeSpotLight = JSX.IntrinsicElements['feSpotLight'];
// @ts-ignore
export type JSXIntrinsicElementsfeTile = JSX.IntrinsicElements['feTile'];
// @ts-ignore
export type JSXIntrinsicElementsfeTurbulence = JSX.IntrinsicElements['feTurbulence'];
// @ts-ignore
export type JSXIntrinsicElementsfilter = JSX.IntrinsicElements['filter'];
// @ts-ignore
export type JSXIntrinsicElementsforeignObject = JSX.IntrinsicElements['foreignObject'];
// @ts-ignore
export type JSXIntrinsicElementsg = JSX.IntrinsicElements['g'];
// @ts-ignore
export type JSXIntrinsicElementsimage = JSX.IntrinsicElements['image'];
// @ts-ignore
export type JSXIntrinsicElementsline = JSX.IntrinsicElements['line'];
// @ts-ignore
export type JSXIntrinsicElementslinearGradient = JSX.IntrinsicElements['linearGradient'];
// @ts-ignore
export type JSXIntrinsicElementsmarker = JSX.IntrinsicElements['marker'];
// @ts-ignore
export type JSXIntrinsicElementsmask = JSX.IntrinsicElements['mask'];
// @ts-ignore
export type JSXIntrinsicElementsmetadata = JSX.IntrinsicElements['metadata'];
// @ts-ignore
export type JSXIntrinsicElementsmpath = JSX.IntrinsicElements['mpath'];
// @ts-ignore
export type JSXIntrinsicElementspath = JSX.IntrinsicElements['path'];
// @ts-ignore
export type JSXIntrinsicElementspattern = JSX.IntrinsicElements['pattern'];
// @ts-ignore
export type JSXIntrinsicElementspolygon = JSX.IntrinsicElements['polygon'];
// @ts-ignore
export type JSXIntrinsicElementspolyline = JSX.IntrinsicElements['polyline'];
// @ts-ignore
export type JSXIntrinsicElementsradialGradient = JSX.IntrinsicElements['radialGradient'];
// @ts-ignore
export type JSXIntrinsicElementsrect = JSX.IntrinsicElements['rect'];
// @ts-ignore
export type JSXIntrinsicElementsstop = JSX.IntrinsicElements['stop'];
// @ts-ignore
export type JSXIntrinsicElementsswitch = JSX.IntrinsicElements['switch'];
// @ts-ignore
export type JSXIntrinsicElementssymbol = JSX.IntrinsicElements['symbol'];
// @ts-ignore
export type JSXIntrinsicElementstext = JSX.IntrinsicElements['text'];
// @ts-ignore
export type JSXIntrinsicElementstextPath = JSX.IntrinsicElements['textPath'];
// @ts-ignore
export type JSXIntrinsicElementstspan = JSX.IntrinsicElements['tspan'];
// @ts-ignore
export type JSXIntrinsicElementsuse = JSX.IntrinsicElements['use'];
// @ts-ignore
export type JSXIntrinsicElementsview = JSX.IntrinsicElements['view'];
