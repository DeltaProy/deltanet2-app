import { Injectable } from '@angular/core';
import { Solicitud } from './solicitud';
import { Area } from './area';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private urlEndPoint:string = 'http://173.255.202.95:8085/apiSolic/solicitudes';

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  private isNoAutorizado(e): boolean{
    if(e.status == 401){
      /*------------------------------------------------------
      Si esta autentiocado pero arrojo error 401, indicaria que
      el token ha expirado.
      ------------------------------------------------------*/
      if(this.authService.isAuthenticated()){
        this.authService.logout();
      }
      this.router.navigate(['/login'])
      return true;
    }
    if(e.status == 403){
      swal('Acceso Denegado',`Hola ${this.authService.usuario.username} no tienes acceso a este recurso`,'warning');
      this.router.navigate(['/solicitudes'])
      return true;
    }
    return false;
  }



  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.urlEndPoint + '/areas');
  }

  getSolicitudes(page:number): Observable<Solicitud[]>{
    let pagina:any = page;
    let idUser:any = this.authService.usuario.id;
    let params = new HttpParams();
    params = params.append("page",pagina);
    params = params.append("id",idUser);

    return this.http.get(this.urlEndPoint + '/page',{params: params}).pipe(
      map((response:any) => {
        (response.content as Solicitud[]).map(solicitud => {
          solicitud.titulo = solicitud.titulo.toUpperCase();
          return solicitud;
        })
        return response;
      })
    );
  }

  create(solicitud: Solicitud): Observable<Solicitud>{
    return this.http.post<Solicitud>(this.urlEndPoint, solicitud).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if(e.status == 400){
          return throwError(e);
        }
        swal('Error al crear la solicitud', e.error.mensaje,'error')
        return throwError(e);
      })
    );
  }

  /*--------------------------
  Metodo para buscar una solicitud por ID
  ----------------------------*/
  getSolicitud(id:number): Observable<Solicitud>{
    return this.http.get<Solicitud>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/solicitudes']);
        swal('Error al editar',e.error.mensaje,'error')
        return throwError(e);
      })
    );
  }

  update(solicitud: Solicitud): Observable<Solicitud>{
    return this.http.put<Solicitud>(`${this.urlEndPoint}/${solicitud.id}`,
      solicitud).pipe(
        map((response:any) => response.solicitud as Solicitud),
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(e);
          }
          if(e.status == 400){
            return throwError(e);
          }
          swal('Error al actualizar la solicitud',e.error.mensaje,'error');
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Solicitud> {
    return this.http.delete<Solicitud>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        swal('Error al eliminar la solicitud',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id):Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);

    const req = new HttpRequest('POST',`${this.urlEndPoint}/upload`,formData,{
      reportProgress: true
    });
    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
