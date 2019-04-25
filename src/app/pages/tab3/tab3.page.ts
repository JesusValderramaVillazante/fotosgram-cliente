import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiService } from 'src/app/services/ui.service';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  usuario: Usuario = {};
  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiService,
    private postsService: PostsService
    ){}
  logout(){
    this.postsService.paginaPosts = 0;
    this.usuarioService.logout();
  }

  ngOnInit(){
    this.usuario = this.usuarioService.getUsuario();

  }

  async actualizar( fActualizar: NgForm ){
    if(!fActualizar.invalid){
      const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
      if(actualizado){
        this.uiService.presentToast('registro actualizado');
      }else{
        this.uiService.presentToast('no se pudo actualizar');
      }
    }
  }
}
