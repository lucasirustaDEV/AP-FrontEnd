import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { ImagenService } from 'src/app/service/imagen.service';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent implements OnInit {

  form: FormGroup;

  educacion: Educacion = null;

  imglogo: string;

  imgUrl: string = "";

  constructor(
    private educacionS: EducacionService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public imagenService: ImagenService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group(
      {
        nombreE:['', [Validators.required]],
        descripcionE:['', [Validators.required]],
        desde:['', [Validators.required]],
        hasta:['', [Validators.required]],
        imglogo:[''],
      }
    )
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.educacionS.detail(id).subscribe(
      data => {
        this.educacion = data;
        this.imgUrl = this.educacion.imglogo;
      }, err => {
        alert("Error al modificar");
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
  get Desde(){
    return this.form.get('desde');
  }
  get Hasta(){
    return this.form.get('hasta');
  }

  onUpdate(): void {
    if (this.form.valid) {
      const id = this.activatedRoute.snapshot.params['id'];

      if (this.educacion.desde > this.educacion.hasta) {
        alert("La fecha 'Hasta' debe ser menor a 'Desde'")
        document.getElementById("hasta").focus();
      } else {
        if (this.imagenService.url !== "") {
          this.educacion.imglogo = this.imagenService.url;
        } else {
          if (this.educacion.imglogo === null) {
            this.educacion.imglogo = "https://firebasestorage.googleapis.com/v0/b/portfolio-lucas-ap.appspot.com/o/imagenes%2Fexperiencia.png?alt=media&token=00f9e419-dde1-4cf5-b30e-35864ae3826b";
          }
        }
        this.educacionS.update(id, this.educacion).subscribe(
          data => {
            this.router.navigate(['']);
          }, err => {
            alert("Error al modificar educacion");
            this.router.navigate(['']);
          }
        )
      }
    }
  }

  mostrarImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.imagenService.subirArchivo(event, "edu");
    }
  }

}
