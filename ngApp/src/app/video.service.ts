import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Video } from './video';

@Injectable()
export class VideoService {

  private _getURL= '/api/videos';
  private _postURL = '/api/videos';
  private _putURL = '/api/videos/';
  private _deleteURL = '/api/videos/';
  
  constructor(private _http:Http) { }

  getVideos(){
    return this._http.get(this._getURL)
      .map(response => response.json());
  }
  
  addVideo(video: Video){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this._http.post(this._postURL, JSON.stringify(video),options)
      .map(res => res.json());
  }
  
  updateVideo(video: Video){
    //console.log('updating video');
    //console.log(video._id);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this._http.put(this._postURL + video._id, JSON.stringify(video),options)
      .map(res => res.json());
  }
  
  deleteVideo(video: Video){
    
    return this._http.delete(this._deleteURL+video._id)
      .map(res => res.json());
  }
  
}



















