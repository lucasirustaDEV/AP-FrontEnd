import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  proy : Proyecto[] = [];

  constructor(private proyectoS: ProyectoService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.cargarProyecto();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProyecto(): void{
    this.proyectoS.lista().subscribe(data => {this.proy = data;})
  }

  delete(id?: number){
    var resultado = window.confirm('¿Está seguro de eliminar el ítem?');
    if (resultado === true) {
    if(id != undefined){
      this.proyectoS.delete(id).subscribe(
        data => {
          this.cargarProyecto();
        }, error => {
          alert("No se pudo eliminar el proyecto");
        }
      )
    }
  }
  }

}
