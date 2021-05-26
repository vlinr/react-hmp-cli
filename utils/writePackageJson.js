const fs = require('fs')
async function writePackageJson(filePath, data) {
    //根据用户配置调整文件
    let jsonData = {};
    if (fs.existsSync(filePath)) { //判断文件是否存在
        jsonData = fs.readFileSync(filePath, function (err, res) {
        })
        jsonData = JSON.parse(jsonData)
        for (item in data) {
            jsonData[item] = data[item]
        }
    } else {
        for (item in data) {
            jsonData[item] = data[item]
        }
    }
    let obj = JSON.stringify(jsonData, null, '\t');
    fs.writeFileSync(filePath, obj, function (err, res) {
        console.log(err, res);
        Promise.resolve();
    })
}

module.exports = writePackageJson;