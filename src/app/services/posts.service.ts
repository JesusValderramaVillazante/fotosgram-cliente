import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { map, tap, last } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RespuestaPosts } from 'src/interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  paginaPosts = 0;
  constructor(private http: HttpClient) { }

  getPosts(pull: boolean = false) {
    if(pull){
      this.paginaPosts = 0;
    }
    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);
  }

}
