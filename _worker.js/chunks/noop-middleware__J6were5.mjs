globalThis.process??={},globalThis.process.env??={};import{ag as NOOP_MIDDLEWARE_HEADER}from"./astro/server_DwlEfa97.mjs";const NOOP_MIDDLEWARE_FN=async(s,E)=>{const r=await E();return r.headers.set(NOOP_MIDDLEWARE_HEADER,"true"),r};export{NOOP_MIDDLEWARE_FN as N};