import { TestBed } from '@angular/core/testing';

import { CommandFeedbackService } from './command-feedback.service';

describe('CommandFeedbackService', () => {
  let service: CommandFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
