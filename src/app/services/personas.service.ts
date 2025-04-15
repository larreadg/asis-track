import { Injectable } from '@angular/core';
import { AsisTrackDbService, Persona } from './asis-track-db.service';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  constructor(private dbService: AsisTrackDbService) {}

  // C: Agregar una persona
  addPersona(persona: Persona): Promise<number> {
    return this.dbService.personas.add(persona);
  }

  // R: Obtener todas las personas
  getPersonas(cursoId?: number): Promise<Persona[]> {
    return cursoId ? this.dbService.personas.where('curso_id').equals(cursoId).toArray() : this.dbService.personas.toArray();
  }

  // U: Actualizar una persona
  updatePersona(id: number, changes: Partial<Persona>): Promise<number> {
    return this.dbService.personas.update(id, changes);
  }

  // D: Eliminar una persona
  deletePersona(id: number): Promise<void> {
    return this.dbService.personas.delete(id);
  }

  // Buscar personas por un campo específico
  searchPersonasByField(field: keyof Persona, value: any): Promise<Persona[]> {
    return this.dbService.personas.where(field as string).equals(value).toArray();
  }
}
