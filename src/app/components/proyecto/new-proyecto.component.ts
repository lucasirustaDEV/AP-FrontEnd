import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  form: FormGroup;

  nombre: string;
  descripcion: string;
  imgproyecto: string;
  linkproyecto: string;

  imgUrl: string = "";

  constructor(
    private proyectoS: ProyectoService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public imagenService: ImagenService,
    private formBuilder: FormBuilder,
    ) { 
      this.form = this.formBuilder.group(
        {
          nombre:['', [Validators.required]],
          descripcion:['', [Validators.required]],
          linkproyecto:[''],
          imgproyecto:[''],
        }
      )
    }

  ngOnInit(): void {
  }

  get Nombre(){
    return this.form.get('nombre');
  }
  get Descripcion(){
    return this.form.get('descripcion');
  }

  onCreate() {
    if (this.form.valid) {
      if (this.imagenService.url !== "") {
        this.imgproyecto = this.imagenService.url;
      } else {
        this.imgproyecto = "https://firebasestorage.googleapis.com/v0/b/portfolio-lucas-ap.appspot.com/o/imagenes%2Fproyectos.png?alt=media&token=8ec8e515-96d1-4315-9d46-bb048ea37a50"
      }
      const proyecto = new Proyecto(this.nombre, this.descripcion, this.imgproyecto, this.linkproyecto);
     this.proyectoS.save(proyecto).subscribe(
        data => {
          alert("Proyecto agregado con éxito.");
          this.router.navigate(['']);
        }, err => {
          alert("Fallo al agregar proyecto.");
          this.router.navigate(['']);
        }
      )
    } else {
      alert ("Datos insuficientes para agregar el proyecto.");
      this.router.navigate(['']);
    }
  }

  mostrarImagen(event: any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.imgUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.imagenService.subirArchivo(event, "pry");
  }
  }


}
