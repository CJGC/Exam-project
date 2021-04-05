import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsOptsDetailsComponent } from './ans-opts-details.component';

describe('AnsOptsDetailsComponent', () => {
  let component: AnsOptsDetailsComponent;
  let fixture: ComponentFixture<AnsOptsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsOptsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsOptsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
