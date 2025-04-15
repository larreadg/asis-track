import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Curso } from 'src/app/services/asis-track-db.service';
import { CursosService } from 'src/app/services/cursos.service';


@Component({
  selector: 'app-cursos-add',
  templateUrl: './cursos-add.component.html',
  styleUrls: ['./cursos-add.component.scss']
})
export class CursosAddComponent {

  form : FormGroup
  bItems: MenuItem[] = [{ icon: 'pi pi-home', routerLink: '/home' }, { label: 'Cursos', routerLink: '/cursos' }, { label: 'Agregar', routerLink: '/cursos/add' }]

  constructor(private formBuilder: FormBuilder, private cursosService: CursosService, private router: Router) { 
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]]
    });
  }

  guardar = async() => {
    if(this.form.valid) {
      let nombre = this.form.controls['nombre'].value
      let seach: Curso[] = await this.cursosService.searchCursosByField('nombre', nombre)

      if(seach.length > 0) {
        alert(`El curso ${nombre} ya existe`)
        return
      }

      let curso: Curso = {
        nombre
      }
      await this.cursosService.addCurso(curso)
      this.router.navigate(['/cursos'])
    }
  }
}
