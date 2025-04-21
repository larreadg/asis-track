import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Curso, Persona } from 'src/app/services/asis-track-db.service';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { CursosService } from 'src/app/services/cursos.service';
import { PersonasService } from 'src/app/services/personas.service';
import readXlsxFile from 'read-excel-file'

@Component({
  selector: 'app-estudiantes-list',
  templateUrl: './estudiantes-list.component.html',
  styleUrls: ['./estudiantes-list.component.scss']
})
export class EstudiantesListComponent {
  cursoId: number = 0
  cursoNombre: string = ''
  estudiantes: Persona[] = []
  bItems: MenuItem[] = [{ icon: 'pi pi-home', routerLink: '/home' }, { label: '..', routerLink: '/cursos' }]
  
  constructor(private personasService: PersonasService, private activatedRoute: ActivatedRoute, 
    private cursosService: CursosService, private asistenciasService: AsistenciasService) {
    this.activatedRoute.params.subscribe(
      data => {
        this.cursoId = Number(data['id'])
        this.getEstudiantes(this.cursoId)
      }
    )
  }
  
  getEstudiantes = async (cursoId:number, updateBc: boolean = true) => {

    let search: Curso[] = await this.cursosService.searchCursosByField('id', cursoId)
    if(search.length === 0) {
      return
    }

    let curso: Curso | undefined = search.shift()

    if(curso) {
      this.cursoNombre = curso.nombre
      this.estudiantes = await this.personasService.getPersonas(cursoId)
      if(updateBc) this.bItems = [...this.bItems, { label: 'Estudiantes' }]
    }

  }

  eliminarEstudiante = async(id:number) => {
    const confirmacion = window.confirm(`¿Estás seguro de realizar esta acción?`);
    if(confirmacion) {
      await this.asistenciasService.deleteAsistenciaByPersonaId(id)
      await this.personasService.deletePersona(id)
      this.getEstudiantes(this.cursoId, false)
    }
  }

  abrirExplorador = () => {
    document.getElementById('importarEstudiantes')?.click()
  }
 
  importarEstudiantes = async(files: File[]) => {

    let rows: any[] = await new Promise((resolve, reject) => {
      readXlsxFile(files[0]).then((rows) => {
        resolve(rows)
      }).catch(err => reject(err))  
    })

    rows.shift()

    for(let p of rows) {
      let persona: Persona = {
        documento: String(p[0]),
        nombres: String(p[1]),
        apellidos: String(p[2]),
        curso_id: this.cursoId
      }
      await this.guardar(persona)
    }
    this.getEstudiantes(this.cursoId, false)
  }

  guardar = async(persona: Persona) => {
    let seach: Persona[] = await this.personasService.searchPersonasByField('documento', persona.documento)
    if(seach.length > 0) {
      return
    }
    await this.personasService.addPersona(persona)
  }
}
