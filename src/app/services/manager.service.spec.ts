import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ManagerService } from './manager.service';

describe('ManagerService', () => {
  let service: ManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    }).compileComponents();
    service = TestBed.inject(ManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * New test
   */
  it('should gather manager json data', waitForAsync(() => {
    service.getManagers().subscribe((result) => {
      expect(result.length).toEqual(11);
    });
  }));
});
