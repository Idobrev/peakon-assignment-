import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LiveSearchComponent } from './live-search.component';
import { ManagerService } from '../services/manager.service';

describe('LiveSearchComponent', () => {
  let component: LiveSearchComponent;
  let fixture: ComponentFixture<LiveSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ LiveSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * New test
   */
  it('should filter Proper', waitForAsync(inject([ManagerService], (managerService: ManagerService) => {
    managerService.getManagers().subscribe((managers) => {
      component.managers = managers;
      expect(component.onChange('Harriet').length).toEqual(3);
      expect(component.onChange('tMc').length).toEqual(1);
      expect(component.onChange('New').length).toEqual(2);
    });
  })));
});
