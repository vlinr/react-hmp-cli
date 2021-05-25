// commands/init.js
const shell = require('shelljs');
const symbols = require('log-symbols');
const clone = require('../utils/clone');
const remote = require('../config/config').cloneAddr;
const getUserInput = require('./getUserInput');
const updatePackage = require('./updatePackage');
const fs = require('fs');
const path = require('path');
const ora = require('ora'); // 用于输出loading
const chalk = require('chalk'); // 用于改变文字颜色
let branch = 'master';
//调用hmp init name 后执行的action
const initAction = async (name, option) => {
    // 检查是否有git
    if (!shell.which('git')) {
        console.log(symbols.error, 'Sorry, the git command is not available！');
        shell.exit(1);
    }
    //验证name是否正确
    if (fs.existsSync(name)) {
        console.log(symbols.warning, `Project folder already exists ${name}！`);
        return;
    }
    if (name.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) {
        console.log(symbols.error, 'Illegal characters in project name！');
        return;
    }
    //获取option里面的分支
    if (option.branch) branch = option.branch;

    //下载模板
    if (option.url) {
        if (option.branch) {
            await clone(`direct:${option.url}#${branch}`, name, { clone: true });
        } else {
            await clone(`direct:${option.url}`, name, { clone: true });
        }
    } else {
        await clone(`direct:${remote}#${branch}`, name, { clone: true });
    }
    //清理不需要的文件以及文件夹
    const deleteDir = ['.git', '.gitignore', 'README.md', 'docs'];
    const pwd = shell.pwd();
    deleteDir.map(item => shell.rm('-rf', pwd + `/${name}/${item}`));
    //配置项目
    const userInput = await getUserInput(name);
    if (!userInput) return false;
    //重写配置文件
    await updatePackage(path.join(pwd.stdout, name, 'package.json'), userInput);
    //开始安装依赖
    const installSpinner = ora('Installing dependencies...').start();
    shell.cd(name); //进入到目录
    //执行安装方法
    if (shell.exec(`npm install`).code !== 0) {
        console.log(symbols.warning, chalk.yellow('Automatic installation failed, please install manually！'));
        installSpinner.fail(); // 安装失败
        shell.exit(1);
    }
    installSpinner.succeed(chalk.green('Dependency installed successfully！'));
    //依赖安装完成，提示项目创建成功~
    require('./icon')();
    console.log(symbols.success, 'Congratulations, the project was successfully created~');
    console.log(symbols.info, `Please use 'cd ${name} & yarn start' to preview`);
    shell.exit(1);
};
module.exports = initAction;