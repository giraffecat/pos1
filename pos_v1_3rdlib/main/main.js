'use strict';

function rebuidsheet(tags){
    var sheet=loadAllItems();
    for(let thing of sheet){
        thing.count=0;
    }
    for(let items of tags)
        if(items.indexOf('-')==-1){
        for(let thing of sheet)
            if(items==thing.barcode)
                thing.count++;
        }
        else{
            for(let thing of sheet)
                if(items.substr(0,10)==thing.barcode)
                    thing.count=thing.count+parseFloat(items.substr(11));
        }
        return sheet;
}
function processInput(tags){
    var sheet=rebuidsheet(tags);
    let receiptItems = [];
    var preferentialthings=loadPromotions();
    var preferentialthing=preferentialthings[0].barcodes;
    for (let item of sheet){
        if(item.count!==0){
            var preferential=0;
            item.preferential=preferential;
            var t=item.barcode;
            if(preferentialthing.indexOf(t)!==-1)
            {preferential=item.price;
                item.preferential=preferential;
            };
        receiptItems.push({
            name: item.name,
            count: item.count,
            unit: item.unit,
            price: item.price,
            subTotal: item.price * item.count-preferential,
            preferential:item.preferential
        });console.log(receiptItems);}
    }
    return receiptItems;
}
function buildSingleItem(receiptItem) {
    return `名称：${receiptItem.name}，数量：${receiptItem.count}${receiptItem.unit}，单价：${receiptItem.price.toFixed(2)}(元)，小计：${receiptItem.subTotal.toFixed(2)}(元)`
}

function printReceipt(tags) {
    let itemStrings = "";
    let receiptItems = processInput(tags);
    let total = 0,allperferential=0;
    for (let index = 0; index < receiptItems.length; index ++) {
        if (index != receiptItems.length - 1) {
            itemStrings += buildSingleItem(receiptItems[index]) + '\n';
        } else {
            itemStrings += buildSingleItem(receiptItems[index]);
        }
        total += receiptItems[index].subTotal;
        allperferential += receiptItems[index].preferential;
    }
    console.log( `***<没钱赚商店>收据***
${itemStrings}
----------------------
总计：${total.toFixed(2)}(元)
节省：${allperferential.toFixed(2)}(元)
**********************`);}
