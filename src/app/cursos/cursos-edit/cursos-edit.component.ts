import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Curso } from 'src/app/services/asis-track-db.service';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos-edit',
  templateUrl: './cursos-edit.component.html',
  styleUrls: ['./cursos-edit.component.scss']
})
export class CursosEditComponent {

  form : FormGroup
  bItems: MenuItem[] = [{ icon: 'pi pi-home', routerLink: '/home' }, { label: '..', routerLink: '/cursos' }]

  constructor(private formBuilder: FormBuilder, private cursosService: CursosService, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombre: ['', [Validators.required]]
    });

    this.activatedRoute.params.subscribe(
      data => {
        this.buscar(Number(data['id']))
      }
    )
  }

  guardar = async() => {
    if(this.form.valid) {
      let nombre = this.form.controls['nombre'].value
      let id = this.form.controls['id'].value
      let seach: Curso[] = await this.cursosService.searchCursosByField('nombre', nombre)

      if(seach.length > 0 && seach.filter(el => el.id !== id).length > 0) {
        alert(`El curso ${nombre} ya existe`)
        return
      }

      let curso: Curso = {
        nombre
      }
      await this.cursosService.updateCurso(id, curso)
      this.router.navigate(['/cursos'])
    }
  }

  buscar = async(id: number) => {
    let search: Curso[] = await this.cursosService.searchCursosByField('id', id)
    if(search.length === 0) {
      this.router.navigate(['/cursos'])
    }

    let curso: Curso | undefined = search.shift()

    if(curso) {
      this.bItems = [...this.bItems, { label: curso.nombre, routerLink: `/cursos/edit/${id}` }]
      this.form.controls['nombre'].setValue(curso.nombre)
      this.form.controls['id'].setValue(id)
    }
  }

}
