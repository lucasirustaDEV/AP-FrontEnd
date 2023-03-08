import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { ImagenService } from 'src/app/service/imagen.service';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {

  form: FormGroup;

  expLab : Experiencia = null;

  imgUrl: string = "";

  constructor(
    private sExperiencia: ExperienciaService, 
    private activatedRouter: ActivatedRoute, 
    private router: Router,
    public imagenService: ImagenService,
    private formBuilder: FormBuilder,
    ) { 
      this.form = this.formBuilder.group(
        {
          nombreE:['', [Validators.required]],
          descripcionE:['', [Validators.required]],
          tareas:['', [Validators.required]],
          desde:['', [Validators.required]],
          hasta:['', [Validators.required]],
          imglogo:[''],
        }
      )
    }

  ngOnInit(): void {
    this.imagenService.url = "";
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.detail(id).subscribe(
      data => {
        this.expLab = data;
        this.imgUrl = this.expLab.imglogo;
      }, error => {
        alert("Error al modificar experiencia");
        this.router.navigate(['']);
      }
    )
  }

  get NombreE(){
    return this.form.get('nombreE');
  }
  get DescripcionE(){
    return this.form.get('descripcionE');
  }
  get Tareas(){
    return this.form.get('tareas');
  }
  get Desde(){
    return this.form.get('desde');
  }
  get Hasta(){
    return this.form.get('hasta');
  }

  onUpdate(): void {
    if (this.form.valid) {
      const id = this.activatedRouter.snapshot.params['id'];

      if (this.expLab.desde > this.expLab.hasta) {
        alert("La fecha 'Hasta' debe ser menor a 'Desde'")
        document.getElementById("hasta").focus();
      } else {
        if (this.imagenService.url !== "") {
          this.expLab.imglogo = this.imagenService.url;
        } else {
          if (this.expLab.imglogo === null) {
            this.expLab.imglogo = "https://firebasestorage.googleapis.com/v0/b/portfolio-lucas-ap.appspot.com/o/imagenes%2Fexperiencia.png?alt=media&token=00f9e419-dde1-4cf5-b30e-35864ae3826b";
          }
        }
        this.sExperiencia.update(id, this.expLab).subscribe(
          data => {
            this.router.navigate(['']);
          }, error => {
            alert("Error al modificar experiencia");
            this.router.navigate(['']);
          }
        )
      }
    }
  }

  mostrarImagen(event: any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.imgUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.imagenService.subirArchivo(event, "exp");
  }
  }

}
