import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { SolicitudService } from './solicitudes/solicitud.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './solicitudes/form.component';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './solicitudes/detalle/detalle.component';

registerLocaleData(localeES,'es');

const routes: Routes = [
  {path: '', redirectTo: '/solicitudes',pathMatch:'full'},
  {path: 'solicitudes', component:SolicitudesComponent},
  {path: 'solicitudes/page/:page', component:SolicitudesComponent},
  {path: 'solicitudes/form', component:FormComponent},
  {path: 'solicitudes/form/:id', component:FormComponent}
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
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SolicitudService,
  {provide: LOCALE_ID, useValue: 'es'},],
  bootstrap: [AppComponent]
})
export class AppModule { }
