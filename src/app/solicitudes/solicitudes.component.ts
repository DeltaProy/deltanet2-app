import { Component, OnInit } from '@angular/core';
import { Solicitud } from './solicitud';
import { SolicitudService } from './solicitud.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html'
})
export class SolicitudesComponent implements OnInit {
  solicitudes: Solicitud[];

  constructor(private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.solicitudService.getSolicitudes().subscribe(
      solicitudes => this.solicitudes = solicitudes
    );
  }

}
