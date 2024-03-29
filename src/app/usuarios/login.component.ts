import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/login/css/main.css',
              '../../assets/login/css/util.css']
})
export class LoginComponent implements OnInit {

  titulo:string = 'Por favor sign in!';
  usuario: Usuario;

  constructor(private authService: AuthService,
              private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal('Login',`Hola ${this.authService.usuario.username} ya estas autenticado!`,'info');
      this.router.navigate(['/solicitudes']);
    }
  }

  login():void {
    if(this.usuario.username == null || this.usuario.password == null){
      swal('Error Login','Username o password vacias','error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;

      this.router.navigate(['/solicitudes']);
      swal('Login',`Hola ${usuario.username}, has iniciado sesión con éxito`,'success');
    }, err => {
      if(err.status = 400){
        swal('Error Login','Usuario o clave incorrectas','error');
      }
    });
  }

}
