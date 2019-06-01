var fs= require('fs');
exports.renderHtml=function (reqmres) {
    return fs.readFileSync(reqmres).toString();
}