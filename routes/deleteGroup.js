var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/', function(req,res,next){
    
    fs.readFile('queue.json','utf-8',(err, queue) =>{
    if (err) throw err;
    queue = JSON.parse(queue);
    for (var key in queue) {
        if (queue.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
            var value=queue[key];
        }
    }
    var newGroupSeqNo = req.query.GroupSeqNo;


    for (var i =0; i<queue.length;i++){
        if(queue[i].GroupSeqNo==newGroupSeqNo){
            console.log(queue[i]);
            queue.splice(i,1);
            fs.writeFileSync('queue.json',JSON.stringify(queue));
            return res.send ("by by "+ newGroupSeqNo);

        }
    }

    return (res.send("the number isn't on list"))
    });
});

module.exports = router;