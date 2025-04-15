import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Persona } from 'src/app/services/asis-track-db.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-estudiantes-edit',
  templateUrl: './estudiantes-edit.component.html',
  styleUrls: ['./estudiantes-edit.component.scss']
})
export class EstudiantesEditComponent {
  cursoId: number = 0
  form : FormGroup
  bItems: MenuItem[] = [{ icon: 'pi pi-home', routerLink: '/home' }, { label: '..', routerLink: '/cursos' }]

  constructor(private formBuilder: FormBuilder, private personasService: PersonasService, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.activatedRoute.params.subscribe(
      data => {
        this.cursoId = Number(data['id'])
        this.bItems = [...this.bItems, { label: '..', routerLink: `/cursos/${this.cursoId}/estudiantes` }]
        this.buscar(Number(data['estudianteId']))
      }
    )

    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
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
      let id = this.form.controls['id'].value
      let seach: Persona[] = await this.personasService.searchPersonasByField('documento', documento)

      if(seach.length > 0 && seach.filter(el => el.id !== id).length > 0) {
        alert(`El Nro. de Doc. ${documento} ya esta registrado`)
        return
      }

      let persona: Persona = {
        nombres,
        apellidos,
        documento,
        curso_id: this.cursoId
      }
      await this.personasService.updatePersona(id, persona)
      this.router.navigate([`/cursos/${this.cursoId}/estudiantes`])
    }
  }

  buscar = async (estudianteId: number) => {
    let search: Persona[] = await this.personasService.searchPersonasByField('id', estudianteId)
    if(search.length === 0) {
      this.router.navigate([`/cursos/${this.cursoId}/estudiantes`])
    }

    let persona: Persona | undefined = search.shift()

    if(persona) {
      this.bItems = [...this.bItems, { label: persona.documento }]
      this.form.controls['nombres'].setValue(persona.nombres)
      this.form.controls['apellidos'].setValue(persona.apellidos)
      this.form.controls['documento'].setValue(persona.documento)
      this.form.controls['id'].setValue(estudianteId)
    }
  }
}
