import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { ImagenService } from 'src/app/service/imagen.service';

@Component({
  selector: 'app-new-educacion',
  templateUrl: './new-educacion.component.html',
  styleUrls: ['./new-educacion.component.css']
})
export class NewEducacionComponent implements OnInit {

  form: FormGroup;

  nombreE: string;
  descripcionE: string;
  desde: string = "2023-03";
  hasta: string = "2023-03";
  imglogo: string;

  imgUrl: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private educacionS: EducacionService,
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
    this.imagenService.url = "";
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

  onCreate(): void {

    if (this.form.valid) {
      if (this.desde > this.hasta) {
        alert("La fecha 'Hasta' debe ser menor a 'Desde'")
        document.getElementById("hasta").focus();
      } else {

        if (this.imagenService.url !== "") {
          this.imglogo = this.imagenService.url;
        } else {
          this.imglogo = "https://firebasestorage.googleapis.com/v0/b/portfolio-lucas-ap.appspot.com/o/imagenes%2Feducacion.png?alt=media&token=b0e1cca4-a0cc-4e17-b577-b30c17579b36";
        }
        const educacion = new Educacion(this.nombreE, this.descripcionE, this.desde, this.hasta, this.imglogo);
        this.educacionS.save(educacion).subscribe(
          data => {
            alert("Educacion agregada con éxito.");
            this.router.navigate(['']);
          }, err => {
            alert("Fallo al agregar educación.");
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
      this.imagenService.subirArchivo(event, "edu");
  }
  }


}
