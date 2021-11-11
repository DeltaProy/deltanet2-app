import { Component, OnInit } from '@angular/core';
import { Solicitud } from './solicitud';
import { SolicitudService} from './solicitud.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public solicitud: Solicitud = new Solicitud();
  public titulo: string = 'Crear Solicitud';

  constructor(private solicitudService: SolicitudService,
              private activatedRoute: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.cargarSolicitud();
  }

  public create(): void{
    this.solicitudService.create(this.solicitud)
    .subscribe(solicitud => {
      this.router.navigate(['/solicitudes'])
      swal('Nueva Solicitud',`Solicituid ${solicitud.titulo} creado con éxito!`,'success')
    })
  }

  cargarSolicitud():void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.solicitudService.getSolicitud(id)
           .subscribe((solicitud) => this.solicitud = solicitud)
      }
    })
  }

  update():void{
    this.solicitudService.update(this.solicitud)
        .subscribe( solicitud => {
          this.router.navigate(['/solicitudes'])

          swal('Solicitud actualizada',
             `Solicitud ${solicitud.id} acualizada con éxito!`,'success')
        })
  }

}
