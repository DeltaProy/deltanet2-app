import { Component, OnInit } from '@angular/core';
import { Solicitud } from './solicitud';
import { SolicitudService } from './solicitud.service';
import { ModalService } from './detalle/modal.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html'
})
export class SolicitudesComponent implements OnInit {
  solicitudes: Solicitud[];
  paginador: any;
  solicitudSeleccionada: Solicitud;

  constructor(private solicitudService: SolicitudService,
    private modalService: ModalService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.solicitudService.getSolicitudes(page)
        .pipe().subscribe((response:any) => {
          this.solicitudes = response.content as Solicitud[];
          this.paginador = response;
        });
    });
  }

  delete(solicitud: Solicitud): void {
    swal({
      title: 'Estas seguro?',
      text: `Seguro que deseas eliminar la solicitud ${solicitud.id}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.solicitudService.delete(solicitud.id).subscribe(
          response => {
            this.solicitudes = this.solicitudes.filter(sol => sol != solicitud)
            swal(
              'Solicitud eliminada',
              `Solicitud ${solicitud.id} eliminada con éxito`,
              'success'
            )
          }
        )
      }
    })
  }

  abrirModal(solicitud: Solicitud){
    this.solicitudSeleccionada = solicitud;
    this.modalService.abrirModal();
  }

}
