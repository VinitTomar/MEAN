import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({  name: 'safe'})
export class SafePipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer){}
  
  transform(url:any): any {
    url = url.replace("watch?v=", "embed/");
    let safeurl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    //console.log(safeurl);
    return safeurl;
  }

}
