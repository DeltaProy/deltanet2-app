import { Injectable } from '@angular/core';
import { Solicitud } from './solicitud';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private urlEndPoint:string = 'http://localhost:8080/apiSolic/solicitudes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getSolicitudes(): Observable<Solicitud[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Solicitud[])
    );
  }

  create(solicitud: Solicitud): Observable<Solicitud>{
    return this.http.post<Solicitud>(this.urlEndPoint, solicitud, {headers: this.httpHeaders})
  }
}
