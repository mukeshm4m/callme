import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySoundComponent } from './my-sound.component';

describe('MySoundComponent', () => {
  let component: MySoundComponent;
  let fixture: ComponentFixture<MySoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
