import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { SolicitudService } from './solicitudes/solicitud.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './solicitudes/form.component';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './solicitudes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptors';

registerLocaleData(localeES,'es');

const routes: Routes = [
  {path: '', redirectTo: '/login',pathMatch:'full'},
  {path: 'solicitudes', component:SolicitudesComponent},
  {path: 'solicitudes/page/:page', component:SolicitudesComponent},
  {path: 'solicitudes/form', component:FormComponent, canActivate:[AuthGuard], data:{role:'ROLE_ADMIN'}},
  {path: 'solicitudes/form/:id', component:FormComponent, canActivate:[AuthGuard], data:{role:'ROLE_ADMIN'}},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SolicitudesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SolicitudService,
  {provide: LOCALE_ID, useValue: 'es'},
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
