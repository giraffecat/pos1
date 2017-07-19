'use strict';
const readlineSync = require('readline-sync');
function select(){
    do{var selection=readlineSync.question(`
    1. 添加学生
    2. 生成成绩单
    3. 退出
    请输入你的选择（1～3）：`);
    if(selection==1)
            Addstudent();
    else if(selection==2)
          printreport();}while (selection!=='3');
}
class Student{
    constructor(student) {
        this.name = student[0];
        this.number = student[1];
        this.nation = student[2];
        this.klass = student[3];
        this.Chinese = student[4];
        this.Math = student[5];
        this.English = student[6];
        this.program = student[7];
    }
}
var Arr=new Array();
function Addstudent() {
        var inputs=readlineSync.question('请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
        var student=inputs.split(' ');
        console.log(student);
       if(student.length!==8)
       {inputs=readlineSync.question(`请正确入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：`);
        student=inputs.split(' ');}
        else{
           console.log(`学生${student[0]}的成绩被添加`)
       }
var member=new Student(student);
    Arr.push(member);
}
function classscore(Arr) {
    var  sum=0;
    for(let item of Arr)
        sum+=parseInt(item.Chinese)+parseInt(item.Math)+parseInt(item.English)+parseInt(item.program);
    return sum
}
function median(Arr) {
    var Medianarr=new Array();
    for(let item of Arr)
    { var sum=parseInt(item.Chinese)+parseInt(item.Math)+parseInt(item.English)+parseInt(item.program);
    Medianarr.push(sum);}
    console.log(Medianarr);
    var change;
    for(let i=0;i<Medianarr.length;i++)
        for(let j=0;j<Medianarr.length;j++)
            if(Medianarr[j]<Medianarr[j+1])
            {change=Medianarr[j];
                Medianarr[j]=Medianarr[j+1];
                Medianarr[j+1]=change;}
                if(Medianarr.length%2==0)
                { var long=Medianarr.length;
    var median=(Medianarr[long/2]+Medianarr[long/2-1])/2;}
    else median=Medianarr[long/2];
    return median;
}
function buildSingleItem(student) {
    var sum=0;
    var sum=parseInt(student.Chinese)+parseInt(student.Math)+parseInt(student.English)+parseInt(student.program);
    var average=sum/4;
    return `|${student.name}|${student.Chinese}|${student.Math}|${student.English}|${student.program}|${average}|${sum}`
}
function printreport() {
    var inputs = readlineSync.question('请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
    var form = inputs.split(' ');
    var itemstring='';
    var average=classscore(Arr)/Arr.length;
    var mediannum=median(Arr);
    for (let formitem of form)
        for (let Arritem of Arr)
            if (Arritem.number == formitem)
                itemstring += buildSingleItem(Arritem)+'\n';

    console.log(`成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
${itemstring}
========================
全班总分平均数：${average}
全班总分中位数：${mediannum}`)
}
select();