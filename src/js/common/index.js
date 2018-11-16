var requireContext = require('require-context');

var context = requireContext('./', true, /\.(js)$/);
var files = {ah:'qwe'};
context.keys().forEach((filename) => {
    console.log(filename);
    files[filename] = context(filename);
});
 export default files;