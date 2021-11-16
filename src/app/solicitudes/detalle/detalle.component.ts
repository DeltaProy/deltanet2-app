import { Component, OnInit, Input } from '@angular/core';
import { Solicitud } from '../solicitud';
import { SolicitudService } from '../solicitud.service';
import { ModalService } from './modal.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from '../../usuarios/auth.service';

@Component({
  selector: 'detalle-solicitud',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  /*-------------------------------------------------------
  Definimos que la solicitud sera un parametro de entrada
  -------------------------------------------------------*/
  @Input() solicitud: Solicitud;

  titulo: string = "Detalle de la solicitud";
  private imagenSeleccionada: File;
  progreso:number = 0;

  constructor(private solicitudService: SolicitudService,
              public modalService: ModalService,
              public authService: AuthService) { }

  ngOnInit() {}

  seleccionarFoto(event:any){
    this.imagenSeleccionada = event.target.files[0];
    this.progreso = 0;
    if(this.imagenSeleccionada.type.indexOf('image')<0){
      swal('Error seleccionar imagen: ','El archivo debe ser del tipo imagen','error');
      this.imagenSeleccionada = null;
    }
  }

  subirImagen(){
    if(!this.imagenSeleccionada){
      swal('Error upload','Debe seleccionar una imagen','error');
    } else {
      this.solicitudService.subirFoto(this.imagenSeleccionada,this.solicitud.id)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded/event.total)*100);
        } else if(event.type === HttpEventType.Response) {
          let response:any = event.body;
          this.solicitud = response.solicitud as Solicitud;
          swal('La foto se ha subido completamente!',response.mensaje,'success');
        }
      });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.imagenSeleccionada = null;
    this.progreso = 0;
  }

}
