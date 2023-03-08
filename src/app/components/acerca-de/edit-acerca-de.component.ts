import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/models/persona.model';
import { ImagenService } from 'src/app/service/imagen.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css']
})

export class EditAcercaDeComponent implements OnInit {

  form: FormGroup;

  persona: persona = null;

  imgUrl: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private personaService: PersonaService,
    private router: Router,
    public imagenService: ImagenService,
    private formBuilder: FormBuilder,
  ) { 
    this.form = this.formBuilder.group(
      {
        nombre:['', [Validators.required]],
        apellido:['', [Validators.required]],
        ocupacion:['', [Validators.required]],
        mail:['', [Validators.required]],
        acerca:['', [Validators.required]],
        fechaNac:['', [Validators.required]],
        edad:[''],
        domicilio:['', [Validators.required]],
        imgperfil:[''],
      }
    )
  }

  ngOnInit(): void {
    this.imagenService.url = "";
    const id = this.activatedRoute.snapshot.params['id'];

    this.personaService.detail(id).subscribe(
      data => {
        this.persona = data;
        this.imgUrl = this.persona.imgperfil;
      }, err => {
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  get Nombre(){
    return this.form.get('nombre');
  }
  get Apellido(){
    return this.form.get('apellido');
  }
  get Ocupacion(){
    return this.form.get('ocupacion');
  }
  get Mail(){
    return this.form.get('mail');
  }
  get Acerca(){
    return this.form.get('acerca');
  }
  get FechaNac(){
    return this.form.get('fechaNac');
  }
  get Domicilio(){
    return this.form.get('domicilio');
  }

  onUpdate(): void {
    if (this.form.valid) {
      const id = this.activatedRoute.snapshot.params['id'];

      if (this.persona.edad < 0) {
        alert("Error en la facha de nacimiento.");
        document.getElementById("fechaNac").focus();
      } else {
        if (this.imagenService.url !== "") {
          this.persona.imgperfil = this.imagenService.url;
        }

        this.persona.fechaNac = new Date(this.persona.fechaNac);
        this.persona.fechaNac.setMinutes(this.persona.fechaNac.getMinutes() + this.persona.fechaNac.getTimezoneOffset());


        this.personaService.update(id, this.persona).subscribe(
          data => {
            this.router.navigate(['']);
          }, err => {
            alert("Error al modificar");
            this.router.navigate(['']);
          }
        )
      }
    }
  }

  calcularEdad(fecha: Date) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
  }

  actualizarEdad(){
    this.persona.edad = this.calcularEdad(this.persona.fechaNac);
  }

  mostrarImagen(event: any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.imgUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.imagenService.subirArchivo(event, "perfil");
  }
  }


}
