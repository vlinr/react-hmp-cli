#!/usr/bin/env node
const commander = require('commander');
const initAction = require('./commands/init');
const downloadAction = require('./commands/download');
//初始化模板
commander.command('init <name>') // 定义init子命令，<name>为必需参数可在action的function中接收，如需设置非必需参数，可使用中括号
    .option('-b, --branch <branch>', 'get the development version') // 配置参数，简写和全写中使用,分割
    .option('-u, --url <url>', 'resource address') // 配置参数，简写和全写中使用,分割
    .description('create project') // 命令描述说明
    .action(initAction);
//专门下载使用
commander.command('download <url>') // 下载git文件专用
    .option('-b, --branch <branch>', 'branch name') // 分支名称  
    .description('download resources according to the resource address~') // 命令描述说明
    .action(downloadAction);

commander.version(require('./package.json').version, '-v,-V,--version', 'view version number');

// 利用commander解析命令行输入，必须写在所有内容最后面
commander.parse(process.argv);
