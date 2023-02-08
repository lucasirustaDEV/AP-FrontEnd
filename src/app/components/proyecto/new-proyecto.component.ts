import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ImagenService } from 'src/app/service/imagen.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {

  nombre: string;
  descripcion: string;
  imgproyecto: string;
  linkproyecto: string;

  imgUrl: string = "";

  link: string = "https://firebasestorage.googleapis.com/v0/b/portfolio-lucas-ap.appspot.com/o/imagenes%2F_20230518210?alt=media&token=db593c97-2118-40ed-b8ca-05940a809f2a";
 

  constructor(
    private proyectoS: ProyectoService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public imagenService: ImagenService
    ) { }

  ngOnInit(): void {
  }

  contar(){
    console.log(this.link.length);
  }

  onCreate(){
    console.log(this.imagenService.url)
    console.log(this.imagenService.url.length)
    this.imgproyecto = this.imagenService.url;
    const proyecto = new Proyecto(this.nombre, this.descripcion, this.imgproyecto, this.linkproyecto);
    this.proyectoS.save(proyecto).subscribe(
      data => {
        alert("Proyecto agregado");
        this. router.navigate(['']);
      }, err => {
        alert("falló");
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