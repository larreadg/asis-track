import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Materia, Persona } from 'src/app/services/asis-track-db.service';
import { MateriasService } from 'src/app/services/materias.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-materias-edit',
  templateUrl: './materias-edit.component.html',
  styleUrls: ['./materias-edit.component.scss']
})
export class MateriasEditComponent {
  cursoId: number = 0
  form : FormGroup
  bItems: MenuItem[] = [{ icon: 'pi pi-home', routerLink: '/home' }, { label: '..', routerLink: '/cursos' }]

  constructor(private formBuilder: FormBuilder, private personasService: PersonasService, private router: Router, 
    private activatedRoute: ActivatedRoute, private materiasService: MateriasService) { 

    this.activatedRoute.params.subscribe(
      data => {
        this.cursoId = Number(data['id'])
        this.bItems = [...this.bItems, { label: '..', routerLink: `/cursos/${this.cursoId}/materias` }]
        this.buscar(Number(data['materiaId']))
      }
    )

    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
    });
  }

  guardar = async() => {
    if(this.form.valid) {
      let nombre = this.form.controls['nombre'].value
      let id = this.form.controls['id'].value
      let search: Materia[] = await this.materiasService.searchMateriasByField('nombre', nombre)

      if(search.length > 0 && search.filter(el => el.id !== id && el.curso_id === this.cursoId).length > 0) {
        alert(`La materia ${nombre} ya se encuentra registrada`)
        return
      }

      let materia: Materia = {
        nombre,
        curso_id: this.cursoId
      }
      await this.materiasService.updateMateria(id, materia)
      this.router.navigate([`/cursos/${this.cursoId}/materias`])
    }
  }

  buscar = async (materiaId: number) => {
    let search: Materia[] = await this.materiasService.searchMateriasByField('id', materiaId)
    if(search.length === 0) {
      this.router.navigate([`/cursos/${this.cursoId}/materias`])
    }

    let materia: Materia | undefined = search.shift()

    if(materia) {
      this.bItems = [...this.bItems, { label: materia.nombre }]
      this.form.controls['nombre'].setValue(materia.nombre)
      this.form.controls['id'].setValue(materiaId)
    }
  }
}
