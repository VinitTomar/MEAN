import { Component, OnInit } from '@angular/core';

import { Video } from './../video';
import { VideoService } from './../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  videos: Video[];
  
  selectedVideo: Video;
  hideNewVideo:boolean = true;
  
  constructor(private _videoService: VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
      .subscribe( videosData => this.videos = videosData);
  }
  
  newVideo(){
   this.hideNewVideo = false; 
  }
  
  onSelectVideo(video: any){
    this.selectedVideo = video;
    this.hideNewVideo = true; 
    //console.log(this.selectedVideo);
  }
  
  onSubmitAddVideo(video: Video){
    this._videoService.addVideo(video)
      .subscribe(resNewVideo => {
      this.videos.push(resNewVideo);
       this.hideNewVideo = true;
      this.selectedVideo = resNewVideo;
    });
  }
  
  onUpdateVideoEvent(video:any){
    this._videoService.updateVideo(video)
      .subscribe(resVideo => video = resVideo);
    this.selectedVideo = null;
  }
  
  onDeleteVideoEvent(video:any){
     let vArray = this.videos;
    this._videoService.deleteVideo(video)
      .subscribe(resDelVideo => {
        for(let i=0; i < vArray.length; i++)
        {
          if(vArray[i]._id === video._id)
          {
            vArray.splice(i,1);
          }
        }
    });
    this.selectedVideo = null;
  }

}
















