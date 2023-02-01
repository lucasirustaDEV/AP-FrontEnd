import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { ImagenService } from 'src/app/service/imagen.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  proyecto: Proyecto = null;

  imgUrl: string = "";

  constructor(
    private proyectoS: ProyectoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public imagenService: ImagenService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.proyectoS.detail(id).subscribe(
      data => {
        this.proyecto = data;
        this.imgUrl = this.proyecto.imgproyecto;
      }, err => {
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (this.imagenService.url !== ""){
      this.proyecto.imgproyecto = this.imagenService.url;
    }  

    this.proyectoS.update(id, this.proyecto).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar proyecto");
        this.router.navigate(['']);
      }
    )
  }

  mostrarImagen(event: any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.imgUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.uploadImage(event, "");
  }
  }

  uploadImage($event: any, seccion: string){
    const id = this.activatedRoute.snapshot.params['id'];
    const fechaHora = new Date();
    const archivoImg = fechaHora.getFullYear().toString() + fechaHora.getMonth().toString() + fechaHora.getDay().toString()
                      + fechaHora.getHours().toString() + fechaHora.getMinutes().toString() + fechaHora.getSeconds().toString();
    const nombre = seccion + "_" + archivoImg;
    
    this.imagenService.subirArchivo($event, nombre);

  }

}
