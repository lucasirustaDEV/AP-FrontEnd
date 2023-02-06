import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { ImagenService } from 'src/app/service/imagen.service';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {
  
  nombreE: string;
  descripcionE: string;
  tareas: string;
  desde: string;
  hasta: string;
  imglogo: string;

  imgUrl: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private sExperiencia: ExperienciaService, 
    private router: Router,
    public imagenService: ImagenService
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {

    if (this.desde > this.hasta) {
      document.getElementById("hasta").focus();
    } else {

    if (this.imagenService.url !== ""){
      this.imglogo = this.imagenService.url;
    } else {
      this.imglogo = "https://firebasestorage.googleapis.com/v0/b/portfolio-lucas-ap.appspot.com/o/imagenes%2Fexperiencia.png?alt=media&token=00f9e419-dde1-4cf5-b30e-35864ae3826b"
    } 
    const expe = new Experiencia(this.nombreE, this.descripcionE, this.tareas, this.desde, this.hasta, this.imglogo);
    console.log(expe);
    this.sExperiencia.save(expe).subscribe(
    data=>{
      alert("Experiencia agregada");
      this.router.navigate(['']);
    }, error =>{
      alert("Falló en agregar")
      this.router.navigate(['']);
    }
    )

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
