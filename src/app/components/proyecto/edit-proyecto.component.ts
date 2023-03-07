import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { ImagenService } from 'src/app/service/imagen.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  form: FormGroup;

  proyecto: Proyecto = null;

  imgUrl: string = "";

  constructor(
    private proyectoS: ProyectoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
    const id = this.activatedRoute.snapshot.params['id'];
    this.proyectoS.detail(id).subscribe(
      data => {
        this.proyecto = data;
        this.imgUrl = this.proyecto.imgproyecto;
      }, err => {
        alert("Error al modificar el proyecto.");
        this.router.navigate(['']);
      }
    )
  }

  get Nombre(){
    return this.form.get('nombre');
  }
  get Descripcion(){
    return this.form.get('descripcion');
  }

  onUpdate(): void {
    if (this.form.valid) {

      const id = this.activatedRoute.snapshot.params['id'];

      if (this.imagenService.url !== "") {
        this.proyecto.imgproyecto = this.imagenService.url;
      } else {
        if (this.proyecto.imgproyecto === null) {
          this.proyecto.imgproyecto = "https://firebasestorage.googleapis.com/v0/b/portfolio-lucas-ap.appspot.com/o/imagenes%2Fproyectos.png?alt=media&token=8ec8e515-96d1-4315-9d46-bb048ea37a50";
        }
      }

      this.proyectoS.update(id, this.proyecto).subscribe(
        data => {
          alert("Éxito al modificar el proyecto.");
          this.router.navigate(['']);
        }, err => {
          alert("Error al modificar el proyecto.");
          this.router.navigate(['']);
        }
      )
    } else {
      alert("Datos insuficientes para modificar el proyecto.");
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
