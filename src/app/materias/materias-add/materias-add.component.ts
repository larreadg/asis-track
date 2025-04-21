import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Materia } from 'src/app/services/asis-track-db.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-materias-add',
  templateUrl: './materias-add.component.html',
  styleUrls: ['./materias-add.component.scss']
})
export class MateriasAddComponent {
  cursoId: number = 0
  form : FormGroup
  bItems: MenuItem[] = [{ icon: 'pi pi-home', routerLink: '/home' }, { label: '..', routerLink: '/cursos' }]

  constructor(private formBuilder: FormBuilder, private router: Router, 
    private activatedRoute: ActivatedRoute, private materiasService: MateriasService) { 

    this.activatedRoute.params.subscribe(
      data => {
        this.cursoId = Number(data['id'])
        this.bItems = [...this.bItems, { label: '..', routerLink: `/cursos/${this.cursoId}/materias` }, { label: 'Agregar' }]
      }
    )

    this.form = this.formBuilder.group({
      nombre: [null, [Validators.required]],
    });
  }

  guardar = async() => {
    if(this.form.valid) {
      let nombre = this.form.controls['nombre'].value
      let search: Materia[] = await this.materiasService.searchMateriasByField('curso_id', this.cursoId)

      if(search.length > 0 && typeof search.find(el => el.nombre === nombre) !== 'undefined') {
        alert(`La materia ${nombre} ya esta registrada`)
        return
      }

      let materia: Materia = {
        nombre,
        curso_id: this.cursoId
      }
      await this.materiasService.addMateria(materia)
      this.router.navigate([`/cursos/${this.cursoId}/materias`])
    }
  }
}
