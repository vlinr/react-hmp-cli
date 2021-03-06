const shell = require('shelljs');
const symbols = require('log-symbols');
const clone = require('../utils/clone');
const remote = require('../config/config').clone_address;
const userInput = require('../utils/userInput');
const writePackageJson = require('../utils/writePackageJson');
const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
//调用hmp init name 后执行的action
const init = async (name, option) => {
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
    //下载模板
    if (option.url) {
        if (option.branch) {
            await clone(`direct:${option.url}#${option.branch}`, name, { clone: true });
        } else {
            await clone(`direct:${option.url}`, name, { clone: true });
        }
    } else {

        //判断是否创建移动版
        const mobile = await userInput({ start: true });
        if (mobile) {
            console.log(`direct:${remote}#mobile`)
            await clone(`direct:${remote}#mobile`, name, { clone: true });
        } else {
            await clone(`direct:${remote}`, name, { clone: true });
        }
    }
    //清理不需要的文件以及文件夹
    const deleteDir = ['.git', '.gitignore', 'README.md', 'docs'];
    const pwd = shell.pwd();
    deleteDir.map(item => shell.rm('-rf', pwd + `/${name}/${item}`));
    //配置项目
    const input = await userInput({ projectName: name });
    if (!input) return false;

    //重写配置文件
    await writePackageJson(path.join(pwd.stdout, name, 'package.json'), input);
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
    require('../utils/console')();
    console.log(symbols.success, 'Congratulations, the project was successfully created~');
    console.log(symbols.info, `------------------------------------------------------------------`);
    console.log(symbols.info, `Please use -----------'cd ${name} && npm run start'----------- to preview!`);
    console.log(symbols.info, `------------------------------------------------------------------`);
    shell.exit(1);
};
module.exports = init;