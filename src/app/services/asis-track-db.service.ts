import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface Curso {
  id?: number;
  nombre: string;
}

export interface Materia {
  id?: number;
  nombre: string;
  curso_id: number;
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
  materia_id: number;
  comentario?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AsisTrackDbService extends Dexie {
  cursos!: Dexie.Table<Curso, number>;
  materias!: Dexie.Table<Materia, number>;
  personas!: Dexie.Table<Persona, number>;
  asistencias!: Dexie.Table<Asistencia, number>;

  constructor() {
    super('AsisTrackDB');
    this.version(2).stores({
      cursos: '++id, nombre',
      materias: '++id, nombre, curso_id',
      personas: '++id, nombres, apellidos, documento, curso_id',
      asistencias: '++id, fecha, persona_id, asistencia, materia_id'
    });

    this.cursos = this.table('cursos');
    this.materias = this.table('materias');
    this.personas = this.table('personas');
    this.asistencias = this.table('asistencias');
  }
}
