var express = require('express');
var router = express.Router();
var youtubePlay = require('../youtube');
// var ledPlay = require('../led');
var {PythonShell} = require('python-shell');
const { response } = require('../app');
const axios = require('axios');

const options = {
  pythonPath : '/Users/yejoonko/.pyenv/versions/anaconda3-5.3.1/envs/study_tensorflow/bin/python/',
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/button', function(req,res,next){
  // python shell 실행
    global.flag = false;
    const pyPath = "/Users/yejoonko/git/Project/smartmirror-web/backend/python/faceRecognition.py";
    PythonShell.run(pyPath, options , function (err, data) { 
      if (err) throw err;  
      console.log(data);
      // res.render('emotion',{emotion: data})
      youtubePlay({data : data});
      //res.render('index', { title: 'Express' });
  });

});


router.get('/getdata', function(req,res,next){
  //console.log(req.body.item[0].id.videoId)
  console.log("getdata",global.uid);
  global.flag = true;
  url = `https://www.youtube.com/embed/${global.uid}?autoplay=1`
  console.log("I'm youtube.js "+ global.uid);
  res.render('youtube',{url : url});
  
  // axios.get('http://localhost:3001/gosocket');
})

// router.get('/gosocket',function(req,res,next){
//   res.redirect('http://localhost:3001/getdata');
// })


module.exports = router;