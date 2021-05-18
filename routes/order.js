var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/', function(req,res,next){
    var GroupSeqNo = req.query.GroupSeqNo;
    var dish = req.query.dish;
    var amount = req.query.amount;

    fs.readFile('queue.json','utf-8',(err, queue) =>{
        if (err) throw err;
        var queue = JSON.parse(queue);



    fs.readFile('menu.json','utf-8',(err, menu) =>{
        if (err) throw err;
        var menu = JSON.parse(menu);


    fs.readFile('order.json','utf-8',(err,orders)=>{
        if (err) throw err;
        var orders = JSON.parse(orders);

        for (var i=0;i <queue.length;i++){

            if (queue[i].GroupSeqNo === GroupSeqNo && queue[i].queue==="sitting")
            {
                for(var j =0; j<menu.dishes.length; j++){
                    if (menu.dishes[j].name===dish)
                    {
                        for(var newOrder =0; newOrder<orders.orders.length; newOrder++)
                        {
                            if (orders.orders[newOrder].GroupSeqNo===GroupSeqNo&&orders.orders[newOrder].dish===dish)
                            {
                                orders.orders[newOrder].amount = parseInt(orders.orders[newOrder].amount)+parseInt( amount);
                                fs.writeFileSync('order.json',JSON.stringify(orders));
                                queue[i].queue = "awaitingbill";
                                fs.writeFileSync('queue.json',JSON.stringify(queue));

                                return res.send ("The invitation was successfully received");


                            } 
                        
                        }
                        orders.orders.push({"GroupSeqNo":GroupSeqNo, "dish": dish,"amount":amount});
                                fs.writeFileSync('order.json',JSON.stringify(orders));
                                return res.send ("The invitation was successfully received"); 

                    }

                }
                return res.send("The dish does not exist")};
            }
            return res.send("The Group number "+GroupSeqNo+" is not waiting for the dish nnnn");
    
        
    })
    })
    })
})
module.exports = router;
