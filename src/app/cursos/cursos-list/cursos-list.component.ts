import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Curso } from 'src/app/services/asis-track-db.service';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos-list',
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.scss']
})
export class CursosListComponent implements OnInit {

  cursos: Curso[] = []
  bItems: MenuItem[] = [{ icon: 'pi pi-home', routerLink: '/home' }, { label: 'Cursos', routerLink: '/cursos' }]
  
  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.getCursos()
  }
  
  getCursos = async () => {
    this.cursos = await this.cursosService.getCursos()
  }
}
