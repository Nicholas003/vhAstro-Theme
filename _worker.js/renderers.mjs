globalThis.process??={},globalThis.process.env??={};import{o as renderJSX,p as createVNode,q as AstroJSX,s as AstroUserError}from"./chunks/astro/server_DwlEfa97.mjs";const slotName=r=>r.trim().replace(/[-_]([a-z])/g,((r,e)=>e.toUpperCase()));async function check(r,e,{default:t=null,...o}={}){if("function"!=typeof r)return!1;const n={};for(const[r,e]of Object.entries(o)){n[slotName(r)]=e}try{return(await r({...e,...n,children:t}))[AstroJSX]}catch(e){throwEnhancedErrorIfMdxComponent(e,r)}return!1}async function renderToStaticMarkup(r,e={},{default:t=null,...o}={}){const n={};for(const[r,e]of Object.entries(o)){n[slotName(r)]=e}const{result:s}=this;try{return{html:await renderJSX(s,createVNode(r,{...e,...n,children:t}))}}catch(e){throw throwEnhancedErrorIfMdxComponent(e,r),e}}function throwEnhancedErrorIfMdxComponent(r,e){if(e[Symbol.for("mdx-component")]){if(AstroUserError.is(r))return;throw r.title=r.name,r.hint="This issue often occurs when your MDX component encounters runtime errors.",r}}const renderer={name:"astro:jsx",check:check,renderToStaticMarkup:renderToStaticMarkup};var server_default=renderer;const renderers=[Object.assign({name:"astro:jsx",serverEntrypoint:"file:///home/runner/work/vhAstro-Theme/vhAstro-Theme/node_modules/@astrojs/mdx/dist/server.js"},{ssr:server_default})];export{renderers};