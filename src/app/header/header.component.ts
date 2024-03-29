import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal('Logout',`Hola ${username} has cerrado sesión con éxito!`,'success');
    this.router.navigate(['/login']);
  }

}
