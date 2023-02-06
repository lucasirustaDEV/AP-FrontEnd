import { Component, OnInit } from '@angular/core';
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

  nombreE: string;
  descripcionE: string;
  desde: string;
  hasta: string;
  imglogo: string;

  imgUrl: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private educacionS: EducacionService,
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
        this.imglogo = "https://firebasestorage.googleapis.com/v0/b/portfolio-lucas-ap.appspot.com/o/imagenes%2Feducacion.png?alt=media&token=b0e1cca4-a0cc-4e17-b577-b30c17579b36";
      } 
      const educacion = new Educacion(this.nombreE, this.descripcionE, this.desde, this.hasta, this.imglogo);
      this.educacionS.save(educacion).subscribe(
        data => {
          alert("Educacion agregada");
          this.router.navigate(['']);
        }, err => {
          alert("falló");
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
      this.imagenService.subirArchivo(event, "edu");
  }
  }


}
