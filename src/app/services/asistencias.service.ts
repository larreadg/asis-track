import { Injectable } from '@angular/core';
import { AsisTrackDbService, Asistencia } from './asis-track-db.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
  constructor(private dbService: AsisTrackDbService) {}

  // C: Agregar una asistencia
  addAsistencia(asistencia: Asistencia): Promise<number> {
    return this.dbService.asistencias.add(asistencia);
  }

  // R: Obtener todas las asistencias
  getAsistencias(): Promise<Asistencia[]> {
    return this.dbService.asistencias.toArray();
  }

  // U: Actualizar una asistencia
  updateAsistencia(id: number, changes: Partial<Asistencia>): Promise<number> {
    return this.dbService.asistencias.update(id, changes);
  }

  // D: Eliminar una asistencia
  deleteAsistenciaByPersonaId(personaId: number): Promise<number> {
    return this.dbService.asistencias.where('persona_id').equals(personaId).delete();
  }
  
  // D: Eliminar una asistencia
  deleteAsistenciaByMateriaId(materiaId: number): Promise<number> {
    return this.dbService.asistencias.where('materia_id').equals(materiaId).delete();
  }

  // Buscar asistencias por un campo específico
  searchAsistenciasByField(field: keyof Asistencia, value: any): Promise<Asistencia[]> {
    return this.dbService.asistencias.where(field as string).equals(value).toArray();
  }
}
