import { Component, OnInit } from '@angular/core';
import { Solicitud } from './solicitud';
import { SolicitudService} from './solicitud.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public solicitud: Solicitud = new Solicitud();
  public titulo: string = 'Crear Solicitud';

  constructor(private solicitudService: SolicitudService,
              private router:Router) { }

  ngOnInit(): void {
  }

  public create(): void{
    this.solicitudService.create(this.solicitud)
    .subscribe(solicitud => {
      this.router.navigate(['/solicitudes'])
      swal('Nueva Solicitud',`Solicituid ${solicitud.titulo} creado con éxito!`,'success')
    }
    )
  }

}
