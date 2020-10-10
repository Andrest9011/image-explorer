import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  static PAGE_SIZE = 20;
  private backUrl = "https://pixabay.com/api";

  constructor(private http: HttpClient) { }

  public getImages(page: number, category?: string, query?: string){
    let params = new HttpParams()
      .set('key', "13119377-fc7e10c6305a7de49da6ecb25")
      .set('page', page.toString())
      .set('lang', 'es')
      .set('per_page', ImagesService.PAGE_SIZE.toString());
      
      if (category) {
        params = params.set("category", category);
      }

      if (query) {
        params = params.set("q", query);
      }

      

    return this.http.get(this.backUrl, { params });
        
  }
}

