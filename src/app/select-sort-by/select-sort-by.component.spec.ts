import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSortByComponent } from './select-sort-by.component';

describe('SelectSortByComponent', () => {
  let component: SelectSortByComponent;
  let fixture: ComponentFixture<SelectSortByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSortByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSortByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
