const shell = require('shelljs');
const symbols = require('log-symbols');
const clone = require('../utils/clone');
const download = async (name, option) => {
    // 检查是否有git
    if (!shell.which('git')) {
        console.log(symbols.error, 'Sorry, the git command is not available！');
        shell.exit(1);
    }
    const projectName = /(?<=\/)[^\/]+(?=\.git)/g.exec(name)[0] || 'vlinr';
    //下载模板
    if (option.branch) {
        await clone(`direct:${name}#${option.branch}`, projectName, { clone: true });
    } else {
        await clone(`direct:${name}`, projectName, { clone: true });
    }
    //清理不需要的文件以及文件夹
    const deleteDir = ['.git', '.gitignore', 'README.md', 'docs'];
    const pwd = shell.pwd();
    deleteDir.map(item => shell.rm('-rf', pwd + `/${projectName}/${item}`));
    //依赖安装完成，提示项目创建成功~
    require('../utils/console')();
    console.log(symbols.success, 'File downloaded successfully~');
    shell.exit(1);
};
module.exports = download;