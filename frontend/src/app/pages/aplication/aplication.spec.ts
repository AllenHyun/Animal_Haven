import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aplication } from './aplication';

describe('Aplication', () => {
  let component: Aplication;
  let fixture: ComponentFixture<Aplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aplication],
    }).compileComponents();

    fixture = TestBed.createComponent(Aplication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
