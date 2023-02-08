import { Component, OnInit } from '@angular/core';
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

  expLab : Experiencia = null;

  imgUrl: string = "";

  constructor(
    private sExperiencia: ExperienciaService, 
    private activatedRouter: ActivatedRoute, 
    private router: Router,
    public imagenService: ImagenService
    ) { }

  ngOnInit(): void {
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

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    if (this.imagenService.url !== ""){
      this.expLab.imglogo = this.imagenService.url;
    } else {
      if (this.expLab.imglogo === null){
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
