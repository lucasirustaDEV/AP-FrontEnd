import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  skill: Skill[] = [];

  constructor(private sSkill: SkillService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.cargarSkills();
    if(this,this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarSkills(): void {
    this.sSkill.lista().subscribe(
      data => {
        this.skill = data;
      }
    )
  }

  delete(id?: number) {
    var resultado = window.confirm('¿Está seguro de eliminar el ítem?');
    if (resultado === true) {
    if(id !== undefined){
      this.sSkill.delete(id).subscribe(
        data => {
          this.cargarSkills();
        }, err => {
          alert("No se pudo eliminar la skill.");
        }
      )
    }
  }
  }

}
