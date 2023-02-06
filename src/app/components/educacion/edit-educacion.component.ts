import { Component, OnInit } from '@angular/core';
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

  educacion: Educacion = null;

  imgUrl: string = "";

  constructor(
    private educacionS: EducacionService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public imagenService: ImagenService
  ) { }

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

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];

      if (this.imagenService.url !== ""){
        this.educacion.imglogo = this.imagenService.url;
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
