import { Injectable } from '@angular/core';
import { AsisTrackDbService, Curso } from './asis-track-db.service';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  constructor(private dbService: AsisTrackDbService) {}

  // C: Agregar un curso
  addCurso(curso: Curso): Promise<number> {
    return this.dbService.cursos.add(curso);
  }

  // R: Obtener todos los cursos
  getCursos(): Promise<Curso[]> {
    return this.dbService.cursos.toArray();
  }

  // U: Actualizar un curso
  updateCurso(id: number, changes: Partial<Curso>): Promise<number> {
    return this.dbService.cursos.update(id, changes);
  }

  // D: Eliminar un curso
  deleteCurso(id: number): Promise<void> {
    return this.dbService.cursos.delete(id);
  }

  // Buscar cursos por un campo específico (asegurate de que el campo esté indexado en el schema)
  searchCursosByField(field: keyof Curso, value: any): Promise<Curso[]> {
    return this.dbService.cursos.where(field as string).equals(value).toArray();
  }
}
