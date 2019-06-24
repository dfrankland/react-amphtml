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
// Replace: // @ts-ignore\ntype JSXIntrinsicElements$1 = JSX.IntrinsicElements['$1'];

// HTML
// @ts-ignore
type JSXIntrinsicElementsa = JSX.IntrinsicElements['a'];
// @ts-ignore
type JSXIntrinsicElementsabbr = JSX.IntrinsicElements['abbr'];
// @ts-ignore
type JSXIntrinsicElementsaddress = JSX.IntrinsicElements['address'];
// @ts-ignore
type JSXIntrinsicElementsarea = JSX.IntrinsicElements['area'];
// @ts-ignore
type JSXIntrinsicElementsarticle = JSX.IntrinsicElements['article'];
// @ts-ignore
type JSXIntrinsicElementsaside = JSX.IntrinsicElements['aside'];
// @ts-ignore
type JSXIntrinsicElementsaudio = JSX.IntrinsicElements['audio'];
// @ts-ignore
type JSXIntrinsicElementsb = JSX.IntrinsicElements['b'];
// @ts-ignore
type JSXIntrinsicElementsbase = JSX.IntrinsicElements['base'];
// @ts-ignore
type JSXIntrinsicElementsbdi = JSX.IntrinsicElements['bdi'];
// @ts-ignore
type JSXIntrinsicElementsbdo = JSX.IntrinsicElements['bdo'];
// @ts-ignore
type JSXIntrinsicElementsbig = JSX.IntrinsicElements['big'];
// @ts-ignore
type JSXIntrinsicElementsblockquote = JSX.IntrinsicElements['blockquote'];
// @ts-ignore
type JSXIntrinsicElementsbody = JSX.IntrinsicElements['body'];
// @ts-ignore
type JSXIntrinsicElementsbr = JSX.IntrinsicElements['br'];
// @ts-ignore
type JSXIntrinsicElementsbutton = JSX.IntrinsicElements['button'];
// @ts-ignore
type JSXIntrinsicElementscanvas = JSX.IntrinsicElements['canvas'];
// @ts-ignore
type JSXIntrinsicElementscaption = JSX.IntrinsicElements['caption'];
// @ts-ignore
type JSXIntrinsicElementscite = JSX.IntrinsicElements['cite'];
// @ts-ignore
type JSXIntrinsicElementscode = JSX.IntrinsicElements['code'];
// @ts-ignore
type JSXIntrinsicElementscol = JSX.IntrinsicElements['col'];
// @ts-ignore
type JSXIntrinsicElementscolgroup = JSX.IntrinsicElements['colgroup'];
// @ts-ignore
type JSXIntrinsicElementsdata = JSX.IntrinsicElements['data'];
// @ts-ignore
type JSXIntrinsicElementsdatalist = JSX.IntrinsicElements['datalist'];
// @ts-ignore
type JSXIntrinsicElementsdd = JSX.IntrinsicElements['dd'];
// @ts-ignore
type JSXIntrinsicElementsdel = JSX.IntrinsicElements['del'];
// @ts-ignore
type JSXIntrinsicElementsdetails = JSX.IntrinsicElements['details'];
// @ts-ignore
type JSXIntrinsicElementsdfn = JSX.IntrinsicElements['dfn'];
// @ts-ignore
type JSXIntrinsicElementsdialog = JSX.IntrinsicElements['dialog'];
// @ts-ignore
type JSXIntrinsicElementsdiv = JSX.IntrinsicElements['div'];
// @ts-ignore
type JSXIntrinsicElementsdl = JSX.IntrinsicElements['dl'];
// @ts-ignore
type JSXIntrinsicElementsdt = JSX.IntrinsicElements['dt'];
// @ts-ignore
type JSXIntrinsicElementsem = JSX.IntrinsicElements['em'];
// @ts-ignore
type JSXIntrinsicElementsembed = JSX.IntrinsicElements['embed'];
// @ts-ignore
type JSXIntrinsicElementsfieldset = JSX.IntrinsicElements['fieldset'];
// @ts-ignore
type JSXIntrinsicElementsfigcaption = JSX.IntrinsicElements['figcaption'];
// @ts-ignore
type JSXIntrinsicElementsfigure = JSX.IntrinsicElements['figure'];
// @ts-ignore
type JSXIntrinsicElementsfooter = JSX.IntrinsicElements['footer'];
// @ts-ignore
type JSXIntrinsicElementsform = JSX.IntrinsicElements['form'];
// @ts-ignore
type JSXIntrinsicElementsh1 = JSX.IntrinsicElements['h1'];
// @ts-ignore
type JSXIntrinsicElementsh2 = JSX.IntrinsicElements['h2'];
// @ts-ignore
type JSXIntrinsicElementsh3 = JSX.IntrinsicElements['h3'];
// @ts-ignore
type JSXIntrinsicElementsh4 = JSX.IntrinsicElements['h4'];
// @ts-ignore
type JSXIntrinsicElementsh5 = JSX.IntrinsicElements['h5'];
// @ts-ignore
type JSXIntrinsicElementsh6 = JSX.IntrinsicElements['h6'];
// @ts-ignore
type JSXIntrinsicElementshead = JSX.IntrinsicElements['head'];
// @ts-ignore
type JSXIntrinsicElementsheader = JSX.IntrinsicElements['header'];
// @ts-ignore
type JSXIntrinsicElementshgroup = JSX.IntrinsicElements['hgroup'];
// @ts-ignore
type JSXIntrinsicElementshr = JSX.IntrinsicElements['hr'];
// @ts-ignore
type JSXIntrinsicElementshtml = JSX.IntrinsicElements['html'];
// @ts-ignore
type JSXIntrinsicElementsi = JSX.IntrinsicElements['i'];
// @ts-ignore
type JSXIntrinsicElementsiframe = JSX.IntrinsicElements['iframe'];
// @ts-ignore
type JSXIntrinsicElementsimg = JSX.IntrinsicElements['img'];
// @ts-ignore
type JSXIntrinsicElementsinput = JSX.IntrinsicElements['input'];
// @ts-ignore
type JSXIntrinsicElementsins = JSX.IntrinsicElements['ins'];
// @ts-ignore
type JSXIntrinsicElementskbd = JSX.IntrinsicElements['kbd'];
// @ts-ignore
type JSXIntrinsicElementskeygen = JSX.IntrinsicElements['keygen'];
// @ts-ignore
type JSXIntrinsicElementslabel = JSX.IntrinsicElements['label'];
// @ts-ignore
type JSXIntrinsicElementslegend = JSX.IntrinsicElements['legend'];
// @ts-ignore
type JSXIntrinsicElementsli = JSX.IntrinsicElements['li'];
// @ts-ignore
type JSXIntrinsicElementslink = JSX.IntrinsicElements['link'];
// @ts-ignore
type JSXIntrinsicElementsmain = JSX.IntrinsicElements['main'];
// @ts-ignore
type JSXIntrinsicElementsmap = JSX.IntrinsicElements['map'];
// @ts-ignore
type JSXIntrinsicElementsmark = JSX.IntrinsicElements['mark'];
// @ts-ignore
type JSXIntrinsicElementsmenu = JSX.IntrinsicElements['menu'];
// @ts-ignore
type JSXIntrinsicElementsmenuitem = JSX.IntrinsicElements['menuitem'];
// @ts-ignore
type JSXIntrinsicElementsmeta = JSX.IntrinsicElements['meta'];
// @ts-ignore
type JSXIntrinsicElementsmeter = JSX.IntrinsicElements['meter'];
// @ts-ignore
type JSXIntrinsicElementsnav = JSX.IntrinsicElements['nav'];
// @ts-ignore
type JSXIntrinsicElementsnoindex = JSX.IntrinsicElements['noindex'];
// @ts-ignore
type JSXIntrinsicElementsnoscript = JSX.IntrinsicElements['noscript'];
// @ts-ignore
type JSXIntrinsicElementsobject = JSX.IntrinsicElements['object'];
// @ts-ignore
type JSXIntrinsicElementsol = JSX.IntrinsicElements['ol'];
// @ts-ignore
type JSXIntrinsicElementsoptgroup = JSX.IntrinsicElements['optgroup'];
// @ts-ignore
type JSXIntrinsicElementsoption = JSX.IntrinsicElements['option'];
// @ts-ignore
type JSXIntrinsicElementsoutput = JSX.IntrinsicElements['output'];
// @ts-ignore
type JSXIntrinsicElementsp = JSX.IntrinsicElements['p'];
// @ts-ignore
type JSXIntrinsicElementsparam = JSX.IntrinsicElements['param'];
// @ts-ignore
type JSXIntrinsicElementspicture = JSX.IntrinsicElements['picture'];
// @ts-ignore
type JSXIntrinsicElementspre = JSX.IntrinsicElements['pre'];
// @ts-ignore
type JSXIntrinsicElementsprogress = JSX.IntrinsicElements['progress'];
// @ts-ignore
type JSXIntrinsicElementsq = JSX.IntrinsicElements['q'];
// @ts-ignore
type JSXIntrinsicElementsrp = JSX.IntrinsicElements['rp'];
// @ts-ignore
type JSXIntrinsicElementsrt = JSX.IntrinsicElements['rt'];
// @ts-ignore
type JSXIntrinsicElementsruby = JSX.IntrinsicElements['ruby'];
// @ts-ignore
type JSXIntrinsicElementss = JSX.IntrinsicElements['s'];
// @ts-ignore
type JSXIntrinsicElementssamp = JSX.IntrinsicElements['samp'];
// @ts-ignore
type JSXIntrinsicElementsscript = JSX.IntrinsicElements['script'];
// @ts-ignore
type JSXIntrinsicElementssection = JSX.IntrinsicElements['section'];
// @ts-ignore
type JSXIntrinsicElementsselect = JSX.IntrinsicElements['select'];
// @ts-ignore
type JSXIntrinsicElementssmall = JSX.IntrinsicElements['small'];
// @ts-ignore
type JSXIntrinsicElementssource = JSX.IntrinsicElements['source'];
// @ts-ignore
type JSXIntrinsicElementsspan = JSX.IntrinsicElements['span'];
// @ts-ignore
type JSXIntrinsicElementsstrong = JSX.IntrinsicElements['strong'];
// @ts-ignore
type JSXIntrinsicElementsstyle = JSX.IntrinsicElements['style'];
// @ts-ignore
type JSXIntrinsicElementssub = JSX.IntrinsicElements['sub'];
// @ts-ignore
type JSXIntrinsicElementssummary = JSX.IntrinsicElements['summary'];
// @ts-ignore
type JSXIntrinsicElementssup = JSX.IntrinsicElements['sup'];
// @ts-ignore
type JSXIntrinsicElementstable = JSX.IntrinsicElements['table'];
// @ts-ignore
type JSXIntrinsicElementstemplate = JSX.IntrinsicElements['template'];
// @ts-ignore
type JSXIntrinsicElementstbody = JSX.IntrinsicElements['tbody'];
// @ts-ignore
type JSXIntrinsicElementstd = JSX.IntrinsicElements['td'];
// @ts-ignore
type JSXIntrinsicElementstextarea = JSX.IntrinsicElements['textarea'];
// @ts-ignore
type JSXIntrinsicElementstfoot = JSX.IntrinsicElements['tfoot'];
// @ts-ignore
type JSXIntrinsicElementsth = JSX.IntrinsicElements['th'];
// @ts-ignore
type JSXIntrinsicElementsthead = JSX.IntrinsicElements['thead'];
// @ts-ignore
type JSXIntrinsicElementstime = JSX.IntrinsicElements['time'];
// @ts-ignore
type JSXIntrinsicElementstitle = JSX.IntrinsicElements['title'];
// @ts-ignore
type JSXIntrinsicElementstr = JSX.IntrinsicElements['tr'];
// @ts-ignore
type JSXIntrinsicElementstrack = JSX.IntrinsicElements['track'];
// @ts-ignore
type JSXIntrinsicElementsu = JSX.IntrinsicElements['u'];
// @ts-ignore
type JSXIntrinsicElementsul = JSX.IntrinsicElements['ul'];
// @ts-ignore
type JSXIntrinsicElementsvar = JSX.IntrinsicElements['var'];
// @ts-ignore
type JSXIntrinsicElementsvideo = JSX.IntrinsicElements['video'];
// @ts-ignore
type JSXIntrinsicElementswbr = JSX.IntrinsicElements['wbr'];
// @ts-ignore
type JSXIntrinsicElementswebview = JSX.IntrinsicElements['webview'];

// SVG
// @ts-ignore
type JSXIntrinsicElementssvg = JSX.IntrinsicElements['svg'];

// @ts-ignore
type JSXIntrinsicElementsanimate = JSX.IntrinsicElements['animate']; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
// @ts-ignore
type JSXIntrinsicElementsanimateMotion = JSX.IntrinsicElements['animateMotion'];
// @ts-ignore
type JSXIntrinsicElementsanimateTransform = JSX.IntrinsicElements['animateTransform']; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
// @ts-ignore
type JSXIntrinsicElementscircle = JSX.IntrinsicElements['circle'];
// @ts-ignore
type JSXIntrinsicElementsclipPath = JSX.IntrinsicElements['clipPath'];
// @ts-ignore
type JSXIntrinsicElementsdefs = JSX.IntrinsicElements['defs'];
// @ts-ignore
type JSXIntrinsicElementsdesc = JSX.IntrinsicElements['desc'];
// @ts-ignore
type JSXIntrinsicElementsellipse = JSX.IntrinsicElements['ellipse'];
// @ts-ignore
type JSXIntrinsicElementsfeBlend = JSX.IntrinsicElements['feBlend'];
// @ts-ignore
type JSXIntrinsicElementsfeColorMatrix = JSX.IntrinsicElements['feColorMatrix'];
// @ts-ignore
type JSXIntrinsicElementsfeComponentTransfer = JSX.IntrinsicElements['feComponentTransfer'];
// @ts-ignore
type JSXIntrinsicElementsfeComposite = JSX.IntrinsicElements['feComposite'];
// @ts-ignore
type JSXIntrinsicElementsfeConvolveMatrix = JSX.IntrinsicElements['feConvolveMatrix'];
// @ts-ignore
type JSXIntrinsicElementsfeDiffuseLighting = JSX.IntrinsicElements['feDiffuseLighting'];
// @ts-ignore
type JSXIntrinsicElementsfeDisplacementMap = JSX.IntrinsicElements['feDisplacementMap'];
// @ts-ignore
type JSXIntrinsicElementsfeDistantLight = JSX.IntrinsicElements['feDistantLight'];
// @ts-ignore
type JSXIntrinsicElementsfeDropShadow = JSX.IntrinsicElements['feDropShadow'];
// @ts-ignore
type JSXIntrinsicElementsfeFlood = JSX.IntrinsicElements['feFlood'];
// @ts-ignore
type JSXIntrinsicElementsfeFuncA = JSX.IntrinsicElements['feFuncA'];
// @ts-ignore
type JSXIntrinsicElementsfeFuncB = JSX.IntrinsicElements['feFuncB'];
// @ts-ignore
type JSXIntrinsicElementsfeFuncG = JSX.IntrinsicElements['feFuncG'];
// @ts-ignore
type JSXIntrinsicElementsfeFuncR = JSX.IntrinsicElements['feFuncR'];
// @ts-ignore
type JSXIntrinsicElementsfeGaussianBlur = JSX.IntrinsicElements['feGaussianBlur'];
// @ts-ignore
type JSXIntrinsicElementsfeImage = JSX.IntrinsicElements['feImage'];
// @ts-ignore
type JSXIntrinsicElementsfeMerge = JSX.IntrinsicElements['feMerge'];
// @ts-ignore
type JSXIntrinsicElementsfeMergeNode = JSX.IntrinsicElements['feMergeNode'];
// @ts-ignore
type JSXIntrinsicElementsfeMorphology = JSX.IntrinsicElements['feMorphology'];
// @ts-ignore
type JSXIntrinsicElementsfeOffset = JSX.IntrinsicElements['feOffset'];
// @ts-ignore
type JSXIntrinsicElementsfePointLight = JSX.IntrinsicElements['fePointLight'];
// @ts-ignore
type JSXIntrinsicElementsfeSpecularLighting = JSX.IntrinsicElements['feSpecularLighting'];
// @ts-ignore
type JSXIntrinsicElementsfeSpotLight = JSX.IntrinsicElements['feSpotLight'];
// @ts-ignore
type JSXIntrinsicElementsfeTile = JSX.IntrinsicElements['feTile'];
// @ts-ignore
type JSXIntrinsicElementsfeTurbulence = JSX.IntrinsicElements['feTurbulence'];
// @ts-ignore
type JSXIntrinsicElementsfilter = JSX.IntrinsicElements['filter'];
// @ts-ignore
type JSXIntrinsicElementsforeignObject = JSX.IntrinsicElements['foreignObject'];
// @ts-ignore
type JSXIntrinsicElementsg = JSX.IntrinsicElements['g'];
// @ts-ignore
type JSXIntrinsicElementsimage = JSX.IntrinsicElements['image'];
// @ts-ignore
type JSXIntrinsicElementsline = JSX.IntrinsicElements['line'];
// @ts-ignore
type JSXIntrinsicElementslinearGradient = JSX.IntrinsicElements['linearGradient'];
// @ts-ignore
type JSXIntrinsicElementsmarker = JSX.IntrinsicElements['marker'];
// @ts-ignore
type JSXIntrinsicElementsmask = JSX.IntrinsicElements['mask'];
// @ts-ignore
type JSXIntrinsicElementsmetadata = JSX.IntrinsicElements['metadata'];
// @ts-ignore
type JSXIntrinsicElementsmpath = JSX.IntrinsicElements['mpath'];
// @ts-ignore
type JSXIntrinsicElementspath = JSX.IntrinsicElements['path'];
// @ts-ignore
type JSXIntrinsicElementspattern = JSX.IntrinsicElements['pattern'];
// @ts-ignore
type JSXIntrinsicElementspolygon = JSX.IntrinsicElements['polygon'];
// @ts-ignore
type JSXIntrinsicElementspolyline = JSX.IntrinsicElements['polyline'];
// @ts-ignore
type JSXIntrinsicElementsradialGradient = JSX.IntrinsicElements['radialGradient'];
// @ts-ignore
type JSXIntrinsicElementsrect = JSX.IntrinsicElements['rect'];
// @ts-ignore
type JSXIntrinsicElementsstop = JSX.IntrinsicElements['stop'];
// @ts-ignore
type JSXIntrinsicElementsswitch = JSX.IntrinsicElements['switch'];
// @ts-ignore
type JSXIntrinsicElementssymbol = JSX.IntrinsicElements['symbol'];
// @ts-ignore
type JSXIntrinsicElementstext = JSX.IntrinsicElements['text'];
// @ts-ignore
type JSXIntrinsicElementstextPath = JSX.IntrinsicElements['textPath'];
// @ts-ignore
type JSXIntrinsicElementstspan = JSX.IntrinsicElements['tspan'];
// @ts-ignore
type JSXIntrinsicElementsuse = JSX.IntrinsicElements['use'];
// @ts-ignore
type JSXIntrinsicElementsview = JSX.IntrinsicElements['view'];
