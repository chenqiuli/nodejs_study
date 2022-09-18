const fs = require('fs');


const ws = fs.createWriteStream('./aaa.txt');

ws.write(`111`);
ws.write('222');
ws.write('333');

ws.end();