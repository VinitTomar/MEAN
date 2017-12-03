const express = require('express');
const mongoose = require('mongoose');
const Video = require('../models/videos');

const router = express.Router();

const db = "mongodb://<username>:<password>@ds113795.mlab.com:13795/vinitvideoplayer";
mongoose.Promise = global.Promise;

mongoose.connect(db,function(err){
  if(err)
    console.log(err);
  else
    console.log('successfully connected to mongoDB');
})

router.get('/videos',function(req, res){
  console.log('get request for all videos');
  Video.find({}).exec(function(err,videos){
    if(err){
      console.log(err);
      res.send('error in getting videos');
    }else{
      res.json(videos);
    }
  }); 
});

router.get('/videos/:id',function(req, res){
  console.log('get request for a single video');
  Video.findById(req.params.id).exec(function(err,video){
    if(err){
      console.log(err);
      res.send('error in getting video '+req.params.id);
    }else{
      res.json(video);
    }
  }); 
});

router.post('/videos',function(req, res){
  console.log('posting a video');
  var video = new Video();
  //console.log(req.body);
  video.title = req.body.title;
  video.url = req.body.url;
  video.description = req.body.description;
  video.save(function(err, insertedVideo){
    if(err){
       console.log(err);
       res.send('errro in creating new video');
    }else
      res.json(insertedVideo);
  });
});

router.put('/videos/:id',function(req, res){
  console.log('updating a video');
  Video.findByIdAndUpdate(
    req.params.id,
    {
      $set : {title:req.body.title, url:req.body.url, description:req.body.description}
    },
    {
      new:true
    },
    function(err, updatedvideo){
      if(err){
       console.log(err);
       res.send('errro in updating video');
    } else
        res.json(updatedvideo);
    }
  );
});

router.delete('/videos/:id',function(req, res){
  console.log('deleting video'+req.params.id);
  Video.findByIdAndRemove(req.params.id,function(err, deletedVideo){
    if(err){
       console.log(err);
       res.send('errro in deleting video');
    } else
        res.json(deletedVideo);
    
  });  
});

module.exports = router;









