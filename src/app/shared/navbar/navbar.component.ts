import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  openSidebar: boolean = false

  constructor(private router: Router) {}

  closeSidebar = (ruta: string) => {
    this.openSidebar = false
    this.router.navigate([ruta])
  }
}
