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

// Primeng
import { ButtonModule } from 'primeng/button'
import { SidebarModule } from 'primeng/sidebar'
import { AvatarModule } from 'primeng/avatar'
import { CardModule } from 'primeng/card'
import { TableModule } from 'primeng/table'
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CursosListComponent,
    CursosAddComponent,
    CursosEditComponent
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

    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
