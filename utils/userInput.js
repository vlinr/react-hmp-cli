/*****
 * 
 * 自定义问题
 * 
 * ******/
async function userInput({
    projectName = '', start = false
}) {
    const inquirer = require('inquirer');
    if (start) {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                message: 'Whether to create a mobile terminal template for you？（Y/n）',
                default: 'N',
                name: 'isMobile'
            }
        ]);
        console.log(answers.isMobile);
        if (answers.isMobile == 'n' || answers.isMobile == 'N' || answers.isMobile == 'No' || answers.isMobile == 'no' || answers.isMobile == 'nO') return false;
        return true;
    }
    // 定义需要询问的问题
    const questions = [
        {
            type: 'input',
            message: 'Please enter the project name:',
            name: 'name',
            validate(val) {
                // if (!val) return 'Project name cannot be empty！';
                if (val.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) return 'The project name contains illegal characters, please re-enter!';
                return true;
            }
        },
        {
            type: 'input',
            message: 'Please enter a project keywords(multiple use; split):',
            name: 'keywords'
        },
        {
            type: 'input',
            message: 'Please enter a project description:',
            name: 'description'
        },
        {
            type: 'input',
            message: 'Please enter your name:',
            name: 'author'
        },

        {
            type: 'input',
            message: 'Are you sure you want to create this project？（Y/n）',
            default: 'Y',
            name: 'isConfirm'
        }
    ];
    // 通过inquirer获取到用户输入的内容
    const answers = await inquirer.prompt(questions);
    if (!answers.name) answers.name = projectName;
    console.log(answers);
    //是否确定创建
    // let confirm = await inquirer.prompt([
    //     {
    //         type: 'confirm',
    //         message: 'Are you sure you want to create this project？',
    //         default: 'Y',
    //         name: 'isConfirm'
    //     }
    // ]);
    // let confirm = await inquirer.prompt([
    //     {
    //         type: 'input',
    //         message: 'Are you sure you want to create this project？（Y/n）',
    //         default: 'Y',
    //         name: 'isConfirm'
    //     }
    // ]);
    if (answers.isConfirm == 'n' || answers.isConfirm == 'N' || answers.isConfirm == 'No' || answers.isConfirm == 'no' || answers.isConfirm == 'nO') return false;
    return answers;
}

module.exports = userInput;