import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  edu: Educacion[] = [];

  anioDesde: string = "";
  anioHasta: string = "";

  constructor(
    private educacionS: EducacionService, 
    private tokenService: TokenService
  ) { }

  isLogged = false;

  ngOnInit(): void {
    this.cargarEducacion();
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarEducacion(): void {
    this.educacionS.lista().subscribe(
      data =>{
        this.edu = data;
      }
    )
  }

  delete(id?: number) {
    var resultado = window.confirm('¿Está seguro de eliminar el ítem?');
    if (resultado === true) {
    if(id != undefined) {
      this.educacionS.delete(id).subscribe(
        data => {
          this.cargarEducacion();
        }, err => {
          alert("No se pudo eliminar el ítem.");
        }
      )
    }
    }

  }

}
