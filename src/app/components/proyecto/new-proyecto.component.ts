import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {

  nombre: string;
  descripcion: string;
  imgproyecto: string;
  linkproyecto: string;

  constructor(private proyectoS: ProyectoService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(){
    const proyecto = new Proyecto(this.nombre, this.descripcion, this.imgproyecto, this.linkproyecto);
    this.proyectoS.save(proyecto).subscribe(
      data => {
        alert("Proyecto agregado");
        this. router.navigate(['']);
      }, err => {
        alert("falló");
        this.router.navigate(['']);
      }
    )
  }

}
