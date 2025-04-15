import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesAddComponent } from './estudiantes-add.component';

describe('EstudiantesAddComponent', () => {
  let component: EstudiantesAddComponent;
  let fixture: ComponentFixture<EstudiantesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
