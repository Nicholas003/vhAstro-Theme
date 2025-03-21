globalThis.process??={},globalThis.process.env??={};import{f as fileExtension,j as joinPaths,s as slash,p as prependForwardSlash,a as removeTrailingForwardSlash,b as appendForwardSlash,c as collapseDuplicateTrailingSlashes,h as hasFileExtension}from"./path_C-ZOwaTP.mjs";import{r as requestIs404Or500,i as isRequestServerIsland,n as notFound,a as redirectToFallback,b as redirectToDefaultLocale,c as requestHasLocale,d as normalizeTheLocale,e as defineMiddleware,S as SERVER_ISLAND_COMPONENT,f as SERVER_ISLAND_ROUTE,g as createEndpoint,R as RouteCache,s as sequence,h as findRouteToRewrite,m as matchRoute,j as RenderContext,P as PERSIST_SYMBOL,k as getSetCookiesFromResponse}from"./index_DpuzOy4_.mjs";import{t as ROUTE_TYPE_HEADER,v as REROUTE_DIRECTIVE_HEADER,D as DEFAULT_404_COMPONENT,A as AstroError,w as ActionNotFoundError,x as bold,z as red,y as yellow,B as dim,C as blue,E as clientAddressSymbol,L as LocalsNotAnObject,F as REROUTABLE_STATUS_CODES,G as responseSentSymbol}from"./astro/server_DwlEfa97.mjs";import{D as DEFAULT_404_ROUTE,d as default404Instance,e as ensure404Route}from"./astro-designed-error-pages_DZKQpR4q.mjs";import{N as NOOP_MIDDLEWARE_FN}from"./noop-middleware__J6were5.mjs";function createI18nMiddleware(e,t,r,s){if(!e)return(e,t)=>t();const a={...e,trailingSlash:r,base:t,format:s},o=redirectToDefaultLocale(a),n=notFound(a),i=requestHasLocale(a.locales),l=redirectToFallback(a),c=(e,r)=>{const s=e.url;return s.pathname===t+"/"||s.pathname===t?o(e):i(e)?void 0:n(e,r)},d=(t,r)=>{let s=!1;const a=t.url;for(const t of a.pathname.split("/"))if(normalizeTheLocale(t)===normalizeTheLocale(e.defaultLocale)){s=!0;break}if(s){const s=a.pathname.replace(`/${e.defaultLocale}`,"");return r.headers.set("Location",s),n(t)}};return async(r,s)=>{const a=await s(),o=a.headers.get(ROUTE_TYPE_HEADER);if("no"===a.headers.get(REROUTE_DIRECTIVE_HEADER)&&void 0===e.fallback)return a;if("page"!==o&&"fallback"!==o)return a;if(requestIs404Or500(r.request,t))return a;if(isRequestServerIsland(r.request,t))return a;const{currentLocale:i}=r;switch(e.strategy){case"manual":return a;case"domains-prefix-other-locales":if(localeHasntDomain(e,i)){const e=d(r,a);if(e)return e}break;case"pathname-prefix-other-locales":{const e=d(r,a);if(e)return e;break}case"domains-prefix-always-no-redirect":if(localeHasntDomain(e,i)){const e=n(r,a);if(e)return e}break;case"pathname-prefix-always-no-redirect":{const e=n(r,a);if(e)return e;break}case"pathname-prefix-always":{const e=c(r,a);if(e)return e;break}case"domains-prefix-always":if(localeHasntDomain(e,i)){const e=c(r,a);if(e)return e}}return l(r,a)}}function localeHasntDomain(e,t){for(const r of Object.values(e.domainLookupTable))if(r===t)return!1;return!0}const FORM_CONTENT_TYPES=["application/x-www-form-urlencoded","multipart/form-data","text/plain"],SAFE_METHODS=["GET","HEAD","OPTIONS"];function createOriginCheckMiddleware(){return defineMiddleware(((e,t)=>{const{request:r,url:s,isPrerendered:a}=e;if(a)return t();if(SAFE_METHODS.includes(r.method))return t();const o=r.headers.get("origin")===s.origin;if(r.headers.has("content-type")){if(hasFormLikeHeader(r.headers.get("content-type"))&&!o)return new Response(`Cross-site ${r.method} form submissions are forbidden`,{status:403})}else if(!o)return new Response(`Cross-site ${r.method} form submissions are forbidden`,{status:403});return t()}))}function hasFormLikeHeader(e){if(e)for(const t of FORM_CONTENT_TYPES)if(e.toLowerCase().includes(t))return!0;return!1}function createDefaultRoutes(e){const t=new URL(e.hrefRoot);return[{instance:default404Instance,matchesComponent:e=>e.href===new URL(DEFAULT_404_COMPONENT,t).href,route:DEFAULT_404_ROUTE.route,component:DEFAULT_404_COMPONENT},{instance:createEndpoint(e),matchesComponent:e=>e.href===new URL(SERVER_ISLAND_COMPONENT,t).href,route:SERVER_ISLAND_ROUTE,component:SERVER_ISLAND_COMPONENT}]}class Pipeline{constructor(e,t,r,s,a,o,n,i=t.adapterName,l=t.clientDirectives,c=t.inlinedScripts,d=t.compressHTML,u=t.i18n,h=t.middleware,p=new RouteCache(e,r),f=(t.site?new URL(t.site):void 0),m=createDefaultRoutes(t),g=t.actions){this.logger=e,this.manifest=t,this.runtimeMode=r,this.renderers=s,this.resolve=a,this.serverLike=o,this.streaming=n,this.adapterName=i,this.clientDirectives=l,this.inlinedScripts=c,this.compressHTML=d,this.i18n=u,this.middleware=h,this.routeCache=p,this.site=f,this.defaultRoutes=m,this.actions=g,this.internalMiddleware=[],"manual"!==u?.strategy&&this.internalMiddleware.push(createI18nMiddleware(u,t.base,t.trailingSlash,t.buildFormat))}internalMiddleware;resolvedMiddleware=void 0;resolvedActions=void 0;async getMiddleware(){if(this.resolvedMiddleware)return this.resolvedMiddleware;if(this.middleware){const e=(await this.middleware()).onRequest??NOOP_MIDDLEWARE_FN;return this.manifest.checkOrigin?this.resolvedMiddleware=sequence(createOriginCheckMiddleware(),e):this.resolvedMiddleware=e,this.resolvedMiddleware}return this.resolvedMiddleware=NOOP_MIDDLEWARE_FN,this.resolvedMiddleware}setActions(e){this.resolvedActions=e}async getActions(){return this.resolvedActions?this.resolvedActions:this.actions?this.actions:{server:{}}}async getAction(e){const t=e.split(".").map((e=>decodeURIComponent(e)));let{server:r}=await this.getActions();if(!r||"object"!=typeof r)throw new TypeError(`Expected \`server\` export in actions file to be an object. Received ${typeof r}.`);for(const e of t){if(!(e in r))throw new AstroError({...ActionNotFoundError,message:ActionNotFoundError.message(t.join("."))});r=r[e]}if("function"!=typeof r)throw new TypeError(`Expected handler for action ${t.join(".")} to be a function. Received ${typeof r}.`);return r}}const RedirectComponentInstance={default:()=>new Response(null,{status:301})},RedirectSinglePageBuiltModule={page:()=>Promise.resolve(RedirectComponentInstance),onRequest:(e,t)=>t(),renderers:[]},dateTimeFormat=new Intl.DateTimeFormat([],{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}),levels={debug:20,info:30,warn:40,error:50,silent:90};function log(e,t,r,s,a=!0){const o=e.level,n=e.dest,i={label:r,level:t,message:s,newLine:a};isLogLevelEnabled(o,t)&&n.write(i)}function isLogLevelEnabled(e,t){return levels[e]<=levels[t]}function info(e,t,r,s=!0){return log(e,"info",t,r,s)}function warn(e,t,r,s=!0){return log(e,"warn",t,r,s)}function error(e,t,r,s=!0){return log(e,"error",t,r,s)}function debug(...e){"_astroGlobalDebug"in globalThis&&globalThis._astroGlobalDebug(...e)}function getEventPrefix({level:e,label:t}){const r=`${dateTimeFormat.format(new Date)}`,s=[];return"error"===e||"warn"===e?(s.push(bold(r)),s.push(`[${e.toUpperCase()}]`)):s.push(r),t&&s.push(`[${t}]`),"error"===e?red(s.join(" ")):"warn"===e?yellow(s.join(" ")):1===s.length?dim(s[0]):dim(s[0])+" "+blue(s.splice(1).join(" "))}class Logger{options;constructor(e){this.options=e}info(e,t,r=!0){info(this.options,e,t,r)}warn(e,t,r=!0){warn(this.options,e,t,r)}error(e,t,r=!0){error(this.options,e,t,r)}debug(e,...t){debug(e,...t)}level(){return this.options.level}forkIntegrationLogger(e){return new AstroIntegrationLogger(this.options,e)}}class AstroIntegrationLogger{options;label;constructor(e,t){this.options=e,this.label=t}fork(e){return new AstroIntegrationLogger(this.options,e)}info(e){info(this.options,this.label,e)}warn(e){warn(this.options,this.label,e)}error(e){error(this.options,this.label,e)}debug(e){debug(this.label,e)}}const consoleLogDestination={write(e){let t=console.error;return levels[e.level]<levels.error&&(t=console.log),"SKIP_FORMAT"===e.label?t(e.message):t(getEventPrefix(e)+" "+e.message),!0}};function getAssetsPrefix(e,t){if(!t)return"";if("string"==typeof t)return t;const r=e.slice(1);return t[r]?t[r]:t.fallback}function createAssetLink(e,t,r){if(r){const t=getAssetsPrefix(fileExtension(e),r);return joinPaths(t,slash(e))}return t?prependForwardSlash(joinPaths(t,slash(e))):e}function createStylesheetElement(e,t,r){return"inline"===e.type?{props:{},children:e.content}:{props:{rel:"stylesheet",href:createAssetLink(e.src,t,r)},children:""}}function createStylesheetElementSet(e,t,r){return new Set(e.map((e=>createStylesheetElement(e,t,r))))}function createModuleScriptElement(e,t,r){return"external"===e.type?createModuleScriptElementWithSrc(e.value,t,r):{props:{type:"module"},children:e.value}}function createModuleScriptElementWithSrc(e,t,r){return{props:{type:"module",src:createAssetLink(e,t,r)},children:""}}function redirectTemplate({status:e,location:t,from:r}){return`<!doctype html>\n<title>Redirecting to: ${t}</title>\n<meta http-equiv="refresh" content="${302===e?2:0};url=${t}">\n<meta name="robots" content="noindex">\n<link rel="canonical" href="${t}">\n<body>\n\t<a href="${t}">Redirecting ${r?`from <code>${r}</code> `:""}to <code>${t}</code></a>\n</body>`}class AppPipeline extends Pipeline{#e;static create(e,{logger:t,manifest:r,runtimeMode:s,renderers:a,resolve:o,serverLike:n,streaming:i,defaultRoutes:l}){const c=new AppPipeline(t,r,s,a,o,n,i,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,l);return c.#e=e,c}headElements(e){const t=this.manifest.routes.find((t=>t.routeData===e)),r=new Set,s=new Set,a=createStylesheetElementSet(t?.styles??[]);for(const e of t?.scripts??[])"stage"in e?"head-inline"===e.stage&&s.add({props:{},children:e.children}):s.add(createModuleScriptElement(e));return{links:r,styles:a,scripts:s}}componentMetadata(){}async getComponentByRoute(e){return(await this.getModuleForRoute(e)).page()}async tryRewrite(e,t){const{newUrl:r,pathname:s,routeData:a}=findRouteToRewrite({payload:e,request:t,routes:this.manifest?.routes.map((e=>e.routeData)),trailingSlash:this.manifest.trailingSlash,buildFormat:this.manifest.buildFormat,base:this.manifest.base});return{newUrl:r,pathname:s,componentInstance:await this.getComponentByRoute(a),routeData:a}}async getModuleForRoute(e){for(const t of this.defaultRoutes)if(e.component===t.component)return{page:()=>Promise.resolve(t.instance),renderers:[]};if("redirect"===e.type)return RedirectSinglePageBuiltModule;if(this.manifest.pageMap){const t=this.manifest.pageMap.get(e.component);if(!t)throw new Error(`Unexpectedly unable to find a component instance for route ${e.route}`);return await t()}if(this.manifest.pageModule)return this.manifest.pageModule;throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.")}}class App{#t;#e;#r=new Logger({dest:consoleLogDestination,level:"info"});#s;#a;#o;#n=!1;constructor(e,t=!0){this.#t=e,this.#e={routes:e.routes.map((e=>e.routeData))},ensure404Route(this.#e),this.#s=removeTrailingForwardSlash(this.#t.base),this.#a=this.#i(this.#e,t),this.#o=new AstroIntegrationLogger(this.#r.options,this.#t.adapterName)}getAdapterLogger(){return this.#o}#i(e,t=!1){return AppPipeline.create(e,{logger:this.#r,manifest:this.#t,runtimeMode:"production",renderers:this.#t.renderers,defaultRoutes:createDefaultRoutes(this.#t),resolve:async e=>{if(!(e in this.#t.entryModules))throw new Error(`Unable to resolve [${e}]`);const t=this.#t.entryModules[e];return t.startsWith("data:")||0===t.length?t:createAssetLink(t,this.#t.base,this.#t.assetsPrefix)},serverLike:!0,streaming:t})}set setManifestData(e){this.#e=e}removeBase(e){return e.startsWith(this.#t.base)?e.slice(this.#s.length+1):e}#l(e){const t=new URL(e.url),r=prependForwardSlash(this.removeBase(t.pathname));try{return decodeURI(r)}catch(e){return this.getAdapterLogger().error(e.toString()),r}}match(e){const t=new URL(e.url);if(this.#t.assets.has(t.pathname))return;let r=this.#c(e);r||(r=prependForwardSlash(this.removeBase(t.pathname)));let s=matchRoute(decodeURI(r),this.#e);return s&&!s.prerender?s:void 0}#c(e){let t;const r=new URL(e.url);if(this.#t.i18n&&("domains-prefix-always"===this.#t.i18n.strategy||"domains-prefix-other-locales"===this.#t.i18n.strategy||"domains-prefix-always-no-redirect"===this.#t.i18n.strategy)){let s=e.headers.get("X-Forwarded-Host"),a=e.headers.get("X-Forwarded-Proto");if(a?a+=":":a=r.protocol,s||(s=e.headers.get("Host")),s&&a){s=s.split(":")[0];try{let e;const o=new URL(`${a}//${s}`);for(const[t,r]of Object.entries(this.#t.i18n.domainLookupTable)){const s=new URL(t);if(o.host===s.host&&o.protocol===s.protocol){e=r;break}}e&&(t=prependForwardSlash(joinPaths(normalizeTheLocale(e),this.removeBase(r.pathname))),r.pathname.endsWith("/")&&(t=appendForwardSlash(t)))}catch(e){this.#r.error("router",`Astro tried to parse ${a}//${s} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`),this.#r.error("router",`Error: ${e}`)}}}return t}#d(e){const{trailingSlash:t}=this.#t;if("/"===e||e.startsWith("/_"))return e;const r=collapseDuplicateTrailingSlashes(e,"never"!==t);return r!==e?r:"ignore"===t?e:"always"!==t||hasFileExtension(e)?"never"===t?removeTrailingForwardSlash(e):e:appendForwardSlash(e)}async render(e,t){let r,s,a,o;const n=new URL(e.url),i=this.#d(n.pathname);if(i!==n.pathname){const t="GET"===e.method?301:308;return new Response(redirectTemplate({status:t,location:i,from:e.url}),{status:t,headers:{location:i+n.search}})}if(o=t?.addCookieHeader,a=t?.clientAddress??Reflect.get(e,clientAddressSymbol),r=t?.routeData,s=t?.locals,r&&(this.#r.debug("router","The adapter "+this.#t.adapterName+" provided a custom RouteData for ",e.url),this.#r.debug("router","RouteData:\n"+r)),s&&"object"!=typeof s){const t=new AstroError(LocalsNotAnObject);return this.#r.error(null,t.stack),this.#u(e,{status:500,error:t,clientAddress:a})}if(r||(r=this.match(e),this.#r.debug("router","Astro matched the following route for "+e.url),this.#r.debug("router","RouteData:\n"+r)),!r)return this.#r.debug("router","Astro hasn't found routes that match "+e.url),this.#r.debug("router","Here's the available routes:\n",this.#e),this.#u(e,{locals:s,status:404,clientAddress:a});const l=this.#l(e),c=this.#h(r,l);let d,u;try{const t=await this.#a.getModuleForRoute(r),o=await RenderContext.create({pipeline:this.#a,locals:s,pathname:l,request:e,routeData:r,status:c,clientAddress:a});u=o.session,d=await o.render(await t.page())}catch(t){return this.#r.error(null,t.stack||t.message||String(t)),this.#u(e,{locals:s,status:500,error:t,clientAddress:a})}finally{await(u?.[PERSIST_SYMBOL]())}if(REROUTABLE_STATUS_CODES.includes(d.status)&&"no"!==d.headers.get(REROUTE_DIRECTIVE_HEADER))return this.#u(e,{locals:s,response:d,status:d.status,error:500===d.status?null:void 0,clientAddress:a});if(d.headers.has(REROUTE_DIRECTIVE_HEADER)&&d.headers.delete(REROUTE_DIRECTIVE_HEADER),o)for(const e of App.getSetCookieFromResponse(d))d.headers.append("set-cookie",e);return Reflect.set(d,responseSentSymbol,!0),d}setCookieHeaders(e){return getSetCookiesFromResponse(e)}static getSetCookieFromResponse=getSetCookiesFromResponse;async#u(e,{locals:t,status:r,response:s,skipMiddleware:a=!1,error:o,clientAddress:n}){const i=`/${r}${"always"===this.#t.trailingSlash?"/":""}`,l=matchRoute(i,this.#e),c=new URL(e.url);if(l){if(l.prerender){const t=l.route.endsWith(`/${r}`)?".html":"",a=new URL(`${this.#s}/${r}${t}`,c);if(a.toString()!==e.url){const e=await fetch(a.toString()),t={status:r};return this.#p(e,s,t)}}const i=await this.#a.getModuleForRoute(l);let d;try{const c=await RenderContext.create({locals:t,pipeline:this.#a,middleware:a?NOOP_MIDDLEWARE_FN:void 0,pathname:this.#l(e),request:e,routeData:l,status:r,props:{error:o},clientAddress:n});d=c.session;const u=await c.render(await i.page());return this.#p(u,s)}catch{if(!1===a)return this.#u(e,{locals:t,status:r,response:s,skipMiddleware:!0,clientAddress:n})}finally{await(d?.[PERSIST_SYMBOL]())}}const d=this.#p(new Response(null,{status:r}),s);return Reflect.set(d,responseSentSymbol,!0),d}#p(e,t,r){if(!t)return void 0!==r?new Response(e.body,{status:r.status,statusText:e.statusText,headers:e.headers}):e;const s=r?.status?r.status:200===t.status?e.status:t.status;try{t.headers.delete("Content-type")}catch{}const a=new Map([...Array.from(e.headers),...Array.from(t.headers)]),o=new Headers;for(const[e,t]of a)o.set(e,t);return new Response(e.body,{status:s,statusText:200===s?e.statusText:t.statusText,headers:o})}#h(e,t){if(!e.pattern.test(t))for(const r of e.fallbackRoutes)if(r.pattern.test(t))return 302;const r=removeTrailingForwardSlash(e.route);return r.endsWith("/404")?404:r.endsWith("/500")?500:200}}function createExports(e){const t=new App(e);return{default:{fetch:async(r,s,a)=>{const{pathname:o}=new URL(r.url);if(e.assets.has(o))return s.ASSETS.fetch(r.url.replace(/\.html$/,""));const n=t.match(r);if(!n){const e=await s.ASSETS.fetch(r.url.replace(/index.html$/,"").replace(/\.html$/,""));if(404!==e.status)return e}Reflect.set(r,Symbol.for("astro.clientAddress"),r.headers.get("cf-connecting-ip")),process.env.ASTRO_STUDIO_APP_TOKEN??=(()=>{if("string"==typeof s.ASTRO_STUDIO_APP_TOKEN)return s.ASTRO_STUDIO_APP_TOKEN})();const i={runtime:{env:s,cf:r.cf,caches:caches,ctx:{waitUntil:e=>a.waitUntil(e),passThroughOnException:()=>{throw new Error("`passThroughOnException` is currently not available in Cloudflare Pages. See https://developers.cloudflare.com/pages/platform/known-issues/#pages-functions.")},props:{}}}},l=await t.render(r,{routeData:n,locals:i});if(t.setCookieHeaders)for(const e of t.setCookieHeaders(l))l.headers.append("Set-Cookie",e);return l}}}}const serverEntrypointModule=Object.freeze(Object.defineProperty({__proto__:null,createExports:createExports},Symbol.toStringTag,{value:"Module"}));export{createExports as c,serverEntrypointModule as s};