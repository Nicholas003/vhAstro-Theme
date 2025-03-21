function appendForwardSlash(e){return e.endsWith("/")?e:e+"/"}function prependForwardSlash(e){return"/"===e[0]?e:"/"+e}globalThis.process??={},globalThis.process.env??={};const MANY_TRAILING_SLASHES=/\/{2,}$/g;function collapseDuplicateTrailingSlashes(e,r){return e?e.replace(MANY_TRAILING_SLASHES,r?"/":"")||"/":e}function removeTrailingForwardSlash(e){return e.endsWith("/")?e.slice(0,e.length-1):e}function removeLeadingForwardSlash(e){return e.startsWith("/")?e.substring(1):e}function trimSlashes(e){return e.replace(/^\/|\/$/g,"")}function isString(e){return"string"==typeof e||e instanceof String}function joinPaths(...e){return e.filter(isString).map(((r,s)=>0===s?removeTrailingForwardSlash(r):s===e.length-1?removeLeadingForwardSlash(r):trimSlashes(r))).join("/")}function isRemotePath(e){return/^(?:http|ftp|https|ws):?\/\//.test(e)||e.startsWith("data:")}function slash(e){return e.replace(/\\/g,"/")}function fileExtension(e){const r=e.split(".").pop();return r!==e?`.${r}`:""}function removeBase(e,r){return e.startsWith(r)?e.slice(removeTrailingForwardSlash(r).length):e}const WITH_FILE_EXT=/\/[^/]+\.\w+$/;function hasFileExtension(e){return WITH_FILE_EXT.test(e)}export{removeTrailingForwardSlash as a,appendForwardSlash as b,collapseDuplicateTrailingSlashes as c,fileExtension as f,hasFileExtension as h,isRemotePath as i,joinPaths as j,prependForwardSlash as p,removeBase as r,slash as s,trimSlashes as t};