var express = require('express');
var router = express.Router();
var fs = require('fs');



/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.readFile('menu.json','utf-8',(err, data) =>{
        if (err) throw err;
        data = JSON.parse(data);
        for (var key in data) {
            if (data.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
                var value=data[key];
            }
        }

        console.log(data);


        res.send(data);
    });


    // res.send('this is the menu');
  });
  
  module.exports = router;
  