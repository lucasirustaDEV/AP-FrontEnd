import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {
  nombreE: string = '';
  descripcionE: string = '';
  tareas: string = '';
  desde: number = 2023;
  hasta: number = 2023;
  imglogo: string = '';

  constructor(private sExperiencia: ExperienciaService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const expe = new Experiencia(this.nombreE, this.descripcionE, this.tareas, this.desde, this.hasta, this.imglogo);
    this.sExperiencia.save(expe).subscribe(data=>{
      alert("Experiencia agregada");
      this.router.navigate(['']);
    }, error =>{
      alert("Falló en agregar")
      this.router.navigate(['']);
    }
    )
  }

  onCrear(): void {
    const expe = new Experiencia(this.nombreE, this.descripcionE, this.tareas, this.desde, this.hasta, this.imglogo);
    this.sExperiencia.save(expe).subscribe(
      {
        next: data=>{
        alert("Experiencia agregada");
        this.router.navigate(['']);
        }, 
        error: error =>{
        alert("Falló en agregar")
        this.router.navigate(['']);
        }
      });
  }

}
