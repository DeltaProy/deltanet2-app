import { Injectable } from '@angular/core';
import { Solicitud } from './solicitud';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private urlEndPoint:string = 'http://localhost:8080/apiSolic/solicitudes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router) { }

  getSolicitudes(page:number): Observable<Solicitud[]>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('SolicitudService: Tap 1');
        (response.content as Solicitud[]).forEach(solicitud => {
          console.log(solicitud.titulo);
        });
      }),
      map((response:any) => {
        (response.content as Solicitud[]).map(solicitud => {
          solicitud.titulo = solicitud.titulo.toUpperCase();
          return solicitud;
        })
        return response;
      }),
      tap(response => {
        console.log('SolicitudService: tap 2');
        (response.content as Solicitud[]).forEach(solicitud => {
          console.log(solicitud.titulo);
        });
      })
    );
  }

  create(solicitud: Solicitud): Observable<Solicitud>{
    return this.http.post<Solicitud>(this.urlEndPoint, solicitud, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.solicitud as Solicitud),
      catchError(e => {
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
  getSolicitud(id:any): Observable<Solicitud>{
    return this.http.get<Solicitud>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/solicitudes']);
        swal('Error al editar',e.error.mensaje,'error')
        return throwError(e);
      })
    );
  }

  update(solicitud: Solicitud): Observable<Solicitud>{
    return this.http.put<Solicitud>(`${this.urlEndPoint}/${solicitud.id}`,
      solicitud,{headers: this.httpHeaders}).pipe(
        map((response:any) => response.solicitud as Solicitud),
        catchError(e => {
          if(e.status == 400){
            return throwError(e);
          }
          swal('Error al actualizar la solicitud',e.error.mensaje,'error');
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Solicitud> {
    return this.http.delete<Solicitud>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        swal('Error al eliminar la solicitud',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }
}
