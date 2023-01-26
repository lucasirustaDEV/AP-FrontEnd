import { Component, OnInit } from '@angular/core';
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
  persona: persona = null;

  imgUrl: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private personaService: PersonaService,
    private router: Router,
    public imagenService: ImagenService
  ) { }

  ngOnInit(): void {
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

  onUpdate(): void{

    const id = this.activatedRoute.snapshot.params['id'];
    
    console.log(this.imagenService.url);

    if (this.imagenService.url !== ""){
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
      this.uploadImage(event, "perfil");
  }
  }

  uploadImage($event: any, seccion: string){
    const id = this.activatedRoute.snapshot.params['id'];
    const fechaHora = new Date();
    const archivoImg = fechaHora.getFullYear().toString() + fechaHora.getMonth().toString() + fechaHora.getDay().toString()
                      + fechaHora.getHours().toString() + fechaHora.getMinutes().toString() + fechaHora.getSeconds().toString();
    const nombre = seccion + "_" + archivoImg;
  
    this.imagenService.uploadImage($event, nombre);
    /*this.imgUrl = this.imagenService.url;
    console.log(this.imgUrl);
    this.persona.imgperfil = this.imagenService.url;*/
  }



}
