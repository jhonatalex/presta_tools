import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailsTransactionComponent } from './fails-transaction.component';

describe('FailsTransactionComponent', () => {
  let component: FailsTransactionComponent;
  let fixture: ComponentFixture<FailsTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailsTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
