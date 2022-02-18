const express = require('express');
const router = express.Router();

//'get' request in at this path, then respond (res) by sending the html file
router.get('/', function(req, res){
    res.render('index'); //omit .ejs from file you wish to serve
    /* 
        next two lines are pre ejs rendering--sending straight html
        const htmlFilePath = path.join(__dirname, 'views', 'index.html');
        res.sendFile(htmlFilePath);
    */
});

router.get('/about', function(req, res){
    res.render('about');
});

// export to get back into app.js
module.exports = router;