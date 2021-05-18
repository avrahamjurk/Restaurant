const { json } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var GroupSeqNo;

router.get('/', function(req,res,next){
    
    fs.readFile('queue.json','utf-8',(err, queue) =>{
            if (err) throw err;
            queue = JSON.parse(queue);
            for (var key in queue) {
                if (queue.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
                    var value=queue[key];
                }
            }

            new_queue = JSON.stringify(queue);
    




    var name = req.query.Name;
    var size = req.query.Size;
    if (name ==null || size == null){
        return res.send("The parachutes are not full")
    }
    var size = parseFloat(size);
    if(size %1 !==0 || size<1 ){

        return res.send("The size "+size+" is false")
    }



    if (!GroupSeqNo){ 
        GroupSeqNo = 00001;}

    else { GroupSeqNo++; }





    var new_group = {"name": name, "size": size, "queue":"tobesitted", "GroupSeqNo": GroupSeqNo };
    new_queue = queue.push(new_group);
    console.log(queue);


    fs.writeFileSync('queue.json',JSON.stringify(queue));

    res.send(queue);

});
});
module.exports = router;

