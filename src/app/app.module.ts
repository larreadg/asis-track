import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CursosListComponent } from './cursos/cursos-list/cursos-list.component';
import { CursosAddComponent } from './cursos/cursos-add/cursos-add.component';
import { CursosEditComponent } from './cursos/cursos-edit/cursos-edit.component'
import { EstudiantesListComponent } from './estudiantes/estudiantes-list/estudiantes-list.component';
import { EstudiantesAddComponent } from './estudiantes/estudiantes-add/estudiantes-add.component';
import { EstudiantesEditComponent } from './estudiantes/estudiantes-edit/estudiantes-edit.component';

// Primeng
import { ButtonModule } from 'primeng/button'
import { SidebarModule } from 'primeng/sidebar'
import { AvatarModule } from 'primeng/avatar'
import { CardModule } from 'primeng/card'
import { TableModule } from 'primeng/table'
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { MateriasListComponent } from './materias/materias-list/materias-list.component';
import { MateriasAddComponent } from './materias/materias-add/materias-add.component';
import { MateriasEditComponent } from './materias/materias-edit/materias-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CursosListComponent,
    CursosAddComponent,
    CursosEditComponent,
    EstudiantesListComponent,
    EstudiantesAddComponent,
    EstudiantesEditComponent,
    SplashScreenComponent,
    MateriasListComponent,
    MateriasAddComponent,
    MateriasEditComponent
  ],
  imports: [
    // Primeng
    ButtonModule,
    SidebarModule,
    AvatarModule,
    CardModule,
    TableModule,
    BreadcrumbModule,
    InputTextModule,
    BadgeModule,

    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
