var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/All', function(req,res,next){
    fs.readFile('queue.json','utf-8',(err, data) =>{
        if (err) throw err;
        if (data.length==0){
            res.send("There are no queues now")}
        else{    
        data = JSON.parse(data);
        for (var key in data) {
            if (data.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
                var value=data[key];
            }

        }
    }
        
        res.send(data);
    });
});

router.get('/AwaitSit', function(req,res,next){
    fs.readFile('queue.json','utf-8',(err,data)=>{
        if (err) throw err;

        if (data.length==0){
            res.send("There are no queues now");}

        else{
            data = JSON.parse(data);
        for (var key in data) {
            if (data.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
                var value=data[key];
            }
        }

        var tobesitted= [];
        for (var i =0; i<data.length;i++){
            if(data[i].queue==="tobesitted"){
                tobesitted.push(data[i]);
            }
        }
        if (tobesitted.length > 0){
            res.send(tobesitted);
        }
        else{res.send("There are no queues to service now");}
    }
    });
});





router.get('/AwaitService', function(req,res,next){
    fs.readFile('queue.json','utf-8',(err,data)=>{
        if (err) throw err;


        if (data.length==0){
            res.send("There are no queues now");
        }

        else{

        data = JSON.parse(data);
        for (var key in data) {
            if (data.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
                var value=data[key];
            }
        };

        var toservice= [];
        for (var i =0; i<data.length;i++){
            if(data[i].queue==="sitting"){
                toservice.push(data[i]);
            }
        }
        if (toservice.length >0){
            res.send(toservice);
        }
    
        else{res.send("There are no queues to service now");}
    }
    });
});




router.get('/AwaitBill', function(req,res,next){
    fs.readFile('queue.json','utf-8',(err,data)=>{
        if (err) throw err;


        if (data.length==0){
            res.send("There are no queues now");
        }

        else{

        data = JSON.parse(data);
        for (var key in data) {
            if (data.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
                var value=data[key];
            }
        };

        var tobill= [];
        for (var i =0; i<data.length;i++){
            if(data[i].queue==="awaitingbill"){
                tobill.push(data[i]);
            }
        }
        if (tobill.length >0){
            res.send(tobill);
        }
    
        else{res.send("There are no queues to bill now");}
    }
    });
});


module.exports = router;
