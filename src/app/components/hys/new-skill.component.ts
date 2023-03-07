import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit {

  form: FormGroup;

  nombre: string = "";
  porcentaje: number = 0;

  constructor(
    private sSkill: SkillService, 
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group(
      {
        nombre:['', [Validators.required]],
        porcentaje:['', [Validators.required, Validators.min(0), Validators.max(100)]],
      }
    )
   }

  ngOnInit(): void {
  }

  get Nombre(){
    return this.form.get('nombre');
  }
  get Porcentaje(){
    return this.form.get('porcentaje');
  }

  onCreate(): void {
    const skill = new Skill(this.nombre, this.porcentaje);
    this.sSkill.save(skill).subscribe(
      data => {
        alert("Skill creada correctamente");
        this.router.navigate(['']);
      }, err => {
        alert("Fallo al agregar skill");
        this.router.navigate(['']);
      }
    )
  }

}
