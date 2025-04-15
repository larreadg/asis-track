import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showSplash: boolean = true;

  ngOnInit(): void {
    // Oculta el splash después de 3 segundos (ajusta según tus necesidades)
    setTimeout(() => {
      this.showSplash = false;
    }, 3000);
  }
}
