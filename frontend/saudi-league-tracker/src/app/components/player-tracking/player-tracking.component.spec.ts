import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTrackingComponent } from './player-tracking.component';

describe('PlayerTrackingComponent', () => {
  let component: PlayerTrackingComponent;
  let fixture: ComponentFixture<PlayerTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
