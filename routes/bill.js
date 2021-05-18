var express = require('express');
var router = express.Router();
var fs = require('fs');



/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.readFile('menu.json','utf-8',(err, menu) =>{
        if (err) throw err;
        menu = JSON.parse(menu);

    fs.readFile('order.json','utf-8',(err, order) =>{
        if (err) throw err;
        order = JSON.parse(order);

    var GroupSeqNumber = req.query.GroupSeqNumber;
    var bill = [];

    for (var i=0; i<order.orders.length;i++){

        if (order.orders[i].GroupSeqNo===GroupSeqNumber){

            var price;
            for (var j=0; j<menu.dishes.length;j++)
            if (menu.dishes[j].name===order.orders[i].dish){
                price = menu.dishes[j].price;
                break;
            }
            
            bill.push({"dish":order.orders[i].dish,"price": price, "amount":order.orders[i].amount,"total":parseInt(price)*parseInt(order.orders[i].amount)})


        }                    

    }
    if (bill ===null){return res.send("The order does not exist")}
    console.log (bill);
    var sumTotal =0;
    var details= " ";
    for (var sum=0; sum<bill.length;sum++){
        sumTotal= sumTotal+ bill[sum].total;
        details+= "dish: "+ bill[sum].dish +", price: "+bill[sum].price+", amount: "+bill[sum].amount+", total: "+bill[sum].total +".\n";
        console.log(details);
        
    }
    
    res.send(details+ " sum total price: "+sumTotal.toString())
    })
    




    



    });
    });

    module.exports = router;
    