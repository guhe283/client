import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {trigger,state,style,transition,animate} from '@angular/animations';
import { GpioComponent } from './gpio.component';

describe('GpioComponent', () => {
  let component: GpioComponent;
  let fixture: ComponentFixture<GpioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
