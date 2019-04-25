import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map, tap, last } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RespuestaPosts, Usuario } from 'src/interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = '';
  private usuario: Usuario = {};
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private nacCtrl: NavController) { }

  login(email: string, password: string) {

    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data)
      .subscribe(async resp => {
        if (resp['ok']) {
          await this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      })
    })
  }

  getUsuario() {
    if (this.usuario._id) {
      this.validaToken();
    }
    return { ... this.usuario };
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  registro(usuario: Usuario) {
    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, usuario)
      .subscribe(async resp => {
        if (resp['ok']) {
          await this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          this.nacCtrl.navigateRoot('/login');
          resolve(false);
        }
      })
    })
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {
    await this.cargarToken();
    if (!this.token) {
      this.nacCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    };

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user`, { headers })
        .subscribe(resp => {
          if (resp['ok']) {
            this.usuario = resp['usuario'];
            resolve(true);
          } else {
            this.nacCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }

  actualizarUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/user/update`, usuario, { headers }).subscribe(resp => {
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          resolve(false);
        }
      })
    });
  }

  logout(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.nacCtrl.navigateRoot('/login', {animated: true});
  }
}
