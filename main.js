var readlineSync = require('readline-sync');

var selection=readlineSync.question('请输入你的选择（1～3）：');
if(selection==1)
    var inputs=readlineSync.question('请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
var student=inputs.split(' ')
console.log(student)
if(inputs.length!==5)
    inputs=readlineSync.question(`请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`);
else console.log(inputs)

