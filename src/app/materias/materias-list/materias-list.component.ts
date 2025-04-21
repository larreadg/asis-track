import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Curso, Materia } from 'src/app/services/asis-track-db.service';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { CursosService } from 'src/app/services/cursos.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-materias-list',
  templateUrl: './materias-list.component.html',
  styleUrls: ['./materias-list.component.scss']
})
export class MateriasListComponent {
  cursoId: number = 0
  cursoNombre: string = ''
  materias: Materia[] = []
  bItems: MenuItem[] = [{ icon: 'pi pi-home', routerLink: '/home' }, { label: '..', routerLink: '/cursos' }]
  
  constructor(private activatedRoute: ActivatedRoute, 
    private cursosService: CursosService, private asistenciasService: AsistenciasService, 
    private materiasService: MateriasService) {
    this.activatedRoute.params.subscribe(
      data => {
        this.cursoId = Number(data['id'])
        this.getMaterias(this.cursoId)
      }
    )
  }
  
  getMaterias = async (cursoId:number, updateBc: boolean = true) => {

    let search: Curso[] = await this.cursosService.searchCursosByField('id', cursoId)
    if(search.length === 0) {
      return
    }

    let curso: Curso | undefined = search.shift()

    if(curso) {
      this.cursoNombre = curso.nombre
      this.materias = await this.materiasService.getMaterias(cursoId)
      if(updateBc) this.bItems = [...this.bItems, { label: 'Materias' }]
    }

  }

  eliminarMateria = async(id:number) => {
    const confirmacion = window.confirm(`¿Estás seguro de realizar esta acción?`);
    if(confirmacion) {
      await this.asistenciasService.deleteAsistenciaByMateriaId(id)
      await this.materiasService.deleteMateria(id)
      this.getMaterias(this.cursoId, false)
    }
  }

}
