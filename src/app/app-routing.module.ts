import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CursosListComponent } from './cursos/cursos-list/cursos-list.component';
import { CursosAddComponent } from './cursos/cursos-add/cursos-add.component';
import { CursosEditComponent } from './cursos/cursos-edit/cursos-edit.component';
import { EstudiantesListComponent } from './estudiantes/estudiantes-list/estudiantes-list.component';
import { EstudiantesAddComponent } from './estudiantes/estudiantes-add/estudiantes-add.component';
import { EstudiantesEditComponent } from './estudiantes/estudiantes-edit/estudiantes-edit.component';
import { MateriasListComponent } from './materias/materias-list/materias-list.component';
import { MateriasAddComponent } from './materias/materias-add/materias-add.component';
import { MateriasEditComponent } from './materias/materias-edit/materias-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cursos',
    component: CursosListComponent
  },
  {
    path: 'cursos/add',
    component: CursosAddComponent
  },
  {
    path: 'cursos/edit/:id',
    component: CursosEditComponent
  },
  {
    path: 'cursos/:id/estudiantes',
    component: EstudiantesListComponent
  },
  {
    path: 'cursos/:id/estudiantes/add',
    component: EstudiantesAddComponent
  },
  {
    path: 'cursos/:id/estudiantes/edit/:estudianteId',
    component: EstudiantesEditComponent
  },
  {
    path: 'cursos/:id/materias',
    component: MateriasListComponent
  },
  {
    path: 'cursos/:id/materias/add',
    component: MateriasAddComponent
  },
  {
    path: 'cursos/:id/materias/edit/:materiaId',
    component: MateriasEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
