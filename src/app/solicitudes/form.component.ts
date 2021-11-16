import { Component, OnInit } from '@angular/core';
import { Solicitud } from './solicitud';
import { Area } from './area';
import { SolicitudService} from './solicitud.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public solicitud: Solicitud = new Solicitud();
  areas:Area[];
  public titulo: string = 'Crear Solicitud';
  public errores: string[];

  constructor(private solicitudService: SolicitudService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.cargarSolicitud();
    this.solicitudService.getAreas().subscribe(areas => this.areas= areas);
  }

  public create(): void{
    this.solicitud.idcrea = 1;
    this.solicitudService.create(this.solicitud)
    .subscribe(solicitud => {
      this.router.navigate(['/solicitudes'])
      swal('Nueva Solicitud',`Solicitud ${solicitud.titulo} creado con éxito!`,'success')
    },
    err => {
      this.errores = err.error.errors as string[];
    }
  )
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
        },
        err => {
          this.errores = err.error.errors as string[];
        }
      )
  }

  compararArea(o1:Area, o2:Area):boolean{
    /*-------------------------------------------------------
    o1: Representa a cada elemento de la lista de getAreas
    o2: Representa al area de la solicitud
    -------------------------------------------------------*/
    if (o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id===o2.id;
  }

}
