import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface Curso {
  id?: number;
  nombre: string;
}

export interface Persona {
  id?: number;
  nombres: string;
  apellidos: string;
  documento: string;
  curso_id: number;
}

export interface Asistencia {
  id?: number;
  fecha: string;
  persona_id: number;
  asistencia: boolean;
  comentario?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AsisTrackDbService extends Dexie {
  cursos: Dexie.Table<Curso, number>;
  personas: Dexie.Table<Persona, number>;
  asistencias: Dexie.Table<Asistencia, number>;

  constructor() {
    super('AsisTrackDB');
    this.version(1).stores({
      cursos: '++id, nombre',
      personas: '++id, nombres, apellidos, documento, fecha_nacimiento, curso_id',
      asistencias: '++id, fecha, persona_id, asistencia'
    });
    this.cursos = this.table('cursos');
    this.personas = this.table('personas');
    this.asistencias = this.table('asistencias');
  }
}
