import { TestBed } from '@angular/core/testing';

import { CommandContentCheckerService } from './command-content-checker.service';

describe('CommandContentCheckerServiceService', () => {
  let service: CommandContentCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandContentCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
