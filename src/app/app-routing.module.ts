import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CursosListComponent } from './cursos/cursos-list/cursos-list.component';
import { CursosAddComponent } from './cursos/cursos-add/cursos-add.component';
import { CursosEditComponent } from './cursos/cursos-edit/cursos-edit.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
