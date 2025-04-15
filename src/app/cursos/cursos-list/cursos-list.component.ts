import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Curso, Persona } from 'src/app/services/asis-track-db.service';
import { CursosService } from 'src/app/services/cursos.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-cursos-list',
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.scss']
})
export class CursosListComponent implements OnInit {

  cursos: Curso[] = []
  bItems: MenuItem[] = [{ icon: 'pi pi-home', routerLink: '/home' }, { label: 'Cursos', routerLink: '/cursos' }]
  
  constructor(private cursosService: CursosService, private personasService: PersonasService) {}

  ngOnInit(): void {
    this.getCursos()
  }
  
  getCursos = async () => {
    this.cursos = await this.cursosService.getCursos()
  }

  eliminarCurso = async(id:number) => {

    let search: Curso[] = await this.cursosService.searchCursosByField('id', id)
    if(search.length === 0) {
      return
    }

    let curso: Curso | undefined = search.shift()

    if(curso) {
      let alumnos: Persona[] = await this.personasService.searchPersonasByField('curso_id', curso.id)
      if(alumnos.length > 0) {
        return alert(`No se puede eliminar, este curso tiene ${alumnos.length} estudiante(s)`)
      }

      const confirmacion = window.confirm(`¿Estás seguro de realizar esta acción?`);
      if (confirmacion) {
        await this.cursosService.deleteCurso(id)
        this.getCursos()
      }    
    }
  }

}
