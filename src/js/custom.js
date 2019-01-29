function requireAll(r) { r.keys().forEach(r); }
$(function(){
    requireAll(require.context('./common', true, /\.js$/));
    requireAll(require.context('./modules', true, /\.js$/));
    //requireAll(require.context('./vendor', true, /\.js$/));
})

import  {checkWindowSP}  from './helper/helper.js';
console.log(checkWindowSP)