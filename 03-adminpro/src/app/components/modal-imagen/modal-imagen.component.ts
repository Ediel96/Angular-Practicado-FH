import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public usuario? : Usuario;
  public imageSubir? : File;
  public imgTemp? : any;

  constructor(public modalImagenServices : ModalImagenService
    , public fileUploadServ: FileUploadService) { }



  ngOnInit(): void {
  }

  cambiarImagen(event:any): any | undefined{
    this.imageSubir = event.target.files[0] as File;

    if(!this.imageSubir){
      return  this.imgTemp! = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imageSubir as File);

    reader.onloadend = () => {
      this.imgTemp! = reader.result;
    }

  }

  subirImagen(){

    const id = this.modalImagenServices.id;
    const tipo = this.modalImagenServices.tipo;

    console.log(this.imageSubir)

    this.fileUploadServ
      .actualizarFoto(this.imageSubir!, 'usuarios', id)
      .then(img => {
        Swal.fire('Guardado','Imagen de usuario actulizado','success');
        this.modalImagenServices.nuevaImagen.emit(img)
        this.cerrarModal();
      }).catch( err =>{
        console.log(err)
      });

  }


  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenServices.cerrarModal()
  }

}
