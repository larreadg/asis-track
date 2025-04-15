import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Persona } from 'src/app/services/asis-track-db.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-estudiantes-add',
  templateUrl: './estudiantes-add.component.html',
  styleUrls: ['./estudiantes-add.component.scss']
})
export class EstudiantesAddComponent {
  cursoId: number = 0
  form : FormGroup
  bItems: MenuItem[] = [{ icon: 'pi pi-home', routerLink: '/home' }, { label: '..', routerLink: '/cursos' }]

  constructor(private formBuilder: FormBuilder, private personasService: PersonasService, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.activatedRoute.params.subscribe(
      data => {
        this.cursoId = Number(data['id'])
        this.bItems = [...this.bItems, { label: '..', routerLink: `/cursos/${this.cursoId}/estudiantes` }, { label: 'Agregar' }]
      }
    )

    this.form = this.formBuilder.group({
      nombres: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      documento: [null, [Validators.required]],
    });
  }

  guardar = async() => {
    if(this.form.valid) {
      let nombres = this.form.controls['nombres'].value
      let apellidos = this.form.controls['apellidos'].value
      let documento = this.form.controls['documento'].value
      let seach: Persona[] = await this.personasService.searchPersonasByField('documento', documento)

      if(seach.length > 0) {
        alert(`El Nro. de Doc. ${documento} ya esta registrado`)
        return
      }

      let persona: Persona = {
        nombres,
        apellidos,
        documento,
        curso_id: this.cursoId
      }
      await this.personasService.addPersona(persona)
      this.router.navigate([`/cursos/${this.cursoId}/estudiantes`])
    }
  }
}
