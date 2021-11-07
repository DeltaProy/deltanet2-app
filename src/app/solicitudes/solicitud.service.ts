import { Injectable } from '@angular/core';
import { SOLICITUDES } from './solicitudes.json';
import { Solicitud } from './solicitud';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor() { }

  getSolicitudes(): Observable<Solicitud[]>{
    return of(SOLICITUDES);
  }
}
