import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  form: FormGroup;

  skill: Skill = null;

  constructor(
    private sSkill: SkillService, 
    private activatedRouter: ActivatedRoute, 
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
    const id = this.activatedRouter.snapshot.params['id'];
    this.sSkill.detail(id).subscribe(
      data => {
        this.skill = data;
      }, err => {
        alert("Error al modificar la skill");
        this.router.navigate(['']);
      }
    )
  }

  get Nombre(){
    return this.form.get('nombre');
  }
  get Porcentaje(){
    return this.form.get('porcentaje');
  }
  
  onUpdate(){
    const id = this.activatedRouter.snapshot.params['id'];
    this.sSkill.update(id, this.skill).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar la skill");
        this.router.navigate(['']);
      }
    )
  }

}
