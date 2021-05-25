// utils/clone.js
const download = require('download-git-repo');
const symbols = require('log-symbols');  // 用于输出图标
const ora = require('ora'); // 用于输出loading
const chalk = require('chalk'); // 用于改变文字颜色
module.exports = function (remote, name, option) {
    const downSpinner = ora('Downloading template file...').start();
    return new Promise((resolve, reject) => {
        download(remote, name, option, err => {
            if (err) {
                downSpinner.fail();
                console.log(symbols.error, chalk.red(err));
                reject(err);
                return;
            };
            downSpinner.succeed(chalk.green('The template file is downloaded successfully！'));
            resolve();
        });
    });
};