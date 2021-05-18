var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/', function(req,res,next){
    var newGroupSeqNo = req.query.GroupSeqNumber;
    var table = req.query.table;


    fs.readFile('table.json','utf-8',(err, tabls) =>{
        if (err) throw err;
        var tabls = JSON.parse(tabls);
    fs.readFile('queue.json','utf-8',(err, queue) =>{
        if (err) throw err;
        var queue = JSON.parse(queue);
                
            var size;
            for (var i =0; i<queue.length ;i++){
                if(queue[i].GroupSeqNo===newGroupSeqNo){
                size = queue[i].size;}




            for (var j =0; j<tabls.tablesetup.length;j++){
                if (tabls.tablesetup[j].table ===table){
                    if (tabls.tablesetup[j].GroupSeqNum!== null)
                    { return res.send("the plase is busy") }
                    if (tabls.tablesetup[j].capacity<size)
                    { return res.send("There is not enough plase for the group")}



                        for (var anotherTable =0; anotherTable<tabls.tablesetup.length;anotherTable++){
                            if (tabls.tablesetup[anotherTable].table !==table && tabls.tablesetup[anotherTable].capacity>=size && tabls.tablesetup[j].capacity>tabls.tablesetup[anotherTable].capacity && tabls.tablesetup[anotherTable].GroupSeqNum === null )
                            { return res.send("Go to another table")}}
                    
                    tabls.tablesetup[j].GroupSeqNum = newGroupSeqNo;
                    fs.writeFileSync('table.json',JSON.stringify(tabls));
                    queue[i].table = table;
                    queue[i].queue = "sitting";
                    fs.writeFileSync('queue.json',JSON.stringify(queue));
                    return res.send("have a chair please");
            }}
    }});
 });
});


module.exports = router;
