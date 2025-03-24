import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommandFeedbackService } from '../../../services/command-feedback.service';
import { CommandService } from '../../../services/command.service';

@Component({
  selector: 'app-clear',
  imports: [],
  templateUrl: './clear.component.html',
  styleUrl: './clear.component.css'
})
export class ClearComponent implements OnInit, OnDestroy {
  public command: string | null = '';
  private destroy$ = new Subject<void>();

  constructor(
    private commandService: CommandService,
    private commandFeedbackService: CommandFeedbackService
  ) {
  }

  ngOnInit(): void {
    this.commandService.command$
      .pipe(takeUntil(this.destroy$))
      .subscribe(command => {
        this.command = command;
        this.updateCommandFeedback();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateCommandFeedback(): void {
    this.commandFeedbackService.clear();
  }
}
