import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiService } from 'src/app/services/ui.service';
import { Usuario } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;

  registerUser: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'test',
    avatar: 'av-1.png'
  }

  loginUser = {
    email: 'juan@hotmail.es',
    password: 'juan'
  }

  constructor(
    private usuarioService: UsuarioService, 
    private nacCtrl: NavController,
    private uiService: UiService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin:NgForm){
    if(fLogin.invalid){
      return;
    }
    
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    
    if(valido){
      this.nacCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    }else{
      this.uiService.alertaInfomartiva("Usuario y contraseña no son correctos");
    }
  }

  async registro(fRegistro:NgForm){
    if(fRegistro.invalid){
      return;
    };

    const valido = await this.usuarioService.registro((this.registerUser));
    
    if(valido){
      this.nacCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    }else{
      this.uiService.alertaInfomartiva("el correo ya existe");
    }
  }

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarlogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
