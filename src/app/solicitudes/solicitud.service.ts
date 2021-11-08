import { Injectable } from '@angular/core';
import { Solicitud } from './solicitud';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private urlEndPoint:string = 'http://localhost:8080/apiSolic/solicitudes';

  constructor(private http: HttpClient) { }

  getSolicitudes(): Observable<Solicitud[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Solicitud[])
    );
  }
}
