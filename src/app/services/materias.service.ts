import { Injectable } from '@angular/core';
import { AsisTrackDbService, Materia } from './asis-track-db.service';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  constructor(private dbService: AsisTrackDbService) {}

  // C: Agregar una materia
  addMateria(materia: Materia): Promise<number> {
    return this.dbService.materias.add(materia);
  }

  // R: Obtener todas las materias
  getMaterias(cursoId?: number): Promise<Materia[]> {
    return cursoId ? this.dbService.materias.where('curso_id').equals(cursoId).toArray() : this.dbService.materias.toArray();
  }

  // U: Actualizar una materia
  updateMateria(id: number, changes: Partial<Materia>): Promise<number> {
    return this.dbService.materias.update(id, changes);
  }

  // D: Eliminar una materia por su ID
  deleteMateria(id: number): Promise<void> {
    return this.dbService.materias.delete(id);
  }

  // Buscar materias por un campo específico
  searchMateriasByField(field: keyof Materia, value: any): Promise<Materia[]> {
    return this.dbService.materias
      .where(field as string)
      .equals(value)
      .toArray();
  }
}
