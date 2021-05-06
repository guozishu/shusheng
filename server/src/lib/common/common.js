const NodeCache = require("node-cache");
const session = new NodeCache();


function randomStr(length) {
    return Math.random().toString(36).slice(2, length + 2);
};

function guidStrList(list) {
    let str = '';
    for (let i = 0; i < list; i++) {
        str += randomStr(5);
        if(i<list-1){
            str+='-';
        }
    }
    return str;
};

module.exports = {
    guidStrList,
    randomStr,
    session
}
