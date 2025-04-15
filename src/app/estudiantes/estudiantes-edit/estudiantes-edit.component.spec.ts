import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesEditComponent } from './estudiantes-edit.component';

describe('EstudiantesEditComponent', () => {
  let component: EstudiantesEditComponent;
  let fixture: ComponentFixture<EstudiantesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
