'use strict';
function buildobject(inputs){
    var arr=new Array();
    var sheet=loadAllItems();
    var i,j,k=0;
    for(i=0;i<inputs.length;i++)
    for(j=0;j<sheet.length;j++)
        if(inputs[i]==sheet[j].barcode){
        arr[k]=sheet[j];
        k++;
        }
        return arr;
}
function countSameName(inputs){
    var input=buildobject(inputs);
    var sheet=new Array();
    var i=0,j=0;
    var count=0;
    sheet[j]=input[i];
    for(i=0;i<input.length;i++)
        if(input[i].name!==sheet[j].name){
            sheet[j].count=count;
            count=1;
            j++;
            sheet[j]=input[i];

        }
        else{count++;

        }
    sheet[j].count=1;

    return sheet;
}
function processInput(inputs){
    var sheet=countSameName(inputs);
    let receiptItems = [];
    for (let item of sheet) {
        receiptItems.push({
            name: item.name,
            count: item.count,
            unit: item.unit,
            price: item.price,
            subTotal: item.price * item.count
        });
    }
    return receiptItems;
}
function buildSingleItem(receiptItem) {
    return `名称：${receiptItem.name}，数量：${receiptItem.count}${receiptItem.unit}，单价：${receiptItem.price.toFixed(2)}(元)，小计：${receiptItem.subTotal.toFixed(2)}(元)`
}

function printReceipt(inputs) {
    let itemStrings = "";
    let receiptItems = processInput(inputs);
    let total = 0;
    for (let index = 0; index < receiptItems.length; index ++) {
        if (index != receiptItems.length - 1) {
            itemStrings += buildSingleItem(receiptItems[index]) + '\n';
        } else {
            itemStrings += buildSingleItem(receiptItems[index]);
        }
        total += receiptItems[index].subTotal;
    }
    console.log( `***<没钱赚商店>收据***
${itemStrings}
----------------------
总计：${total.toFixed(2)}(元)
**********************`);}

