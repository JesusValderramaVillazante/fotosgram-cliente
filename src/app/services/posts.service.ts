import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { map, tap, last } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RespuestaPosts, Post } from 'src/interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  paginaPosts = 0;
  nuevoPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private transfer: FileTransfer) { }

  getPosts(pull: boolean = false) {
    if(pull){
      this.paginaPosts = 0;
    }
    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);
  }

  crearPost(posts){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/posts`, posts, {headers}).subscribe(resp => {
        this.nuevoPost.emit(resp['post']);
        resolve(true);
      })
    })
  }

  subirImagen(img: string){
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {'x-token': this.usuarioService.token}
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(img, `${URL}/posts/upload`, options).then(data=>{
      console.log(data);
    }).catch(err => {
      console.warn(err);
    });
  }
}
