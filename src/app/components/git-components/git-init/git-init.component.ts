import {NgIf, NgOptimizedImage} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {CommandContentCheckerService} from '../../../services/command-content-checker.service';
import {CommandFeedbackService} from '../../../services/command-feedback.service';
import {CommandService} from '../../../services/command.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-git-init',
  imports: [
    NgOptimizedImage,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './git-init.component.html',
  styleUrl: './git-init.component.css'
})
export class GitInitComponent implements OnInit, OnDestroy {

  public command: string | null = '';
  private destroy$ = new Subject<void>();
  private projectHome = "/home/user/opt/your-super-software-project/" //TODO this variable should become dynamic in order to simulate OS behaviour

  constructor(
    private commandService: CommandService,
    private commandContentCheckerService: CommandContentCheckerService,
    private commandFeedbackService: CommandFeedbackService
  ) {
  }

  ngOnInit(): void {
    this.commandService.command$
      .pipe(takeUntil(this.destroy$))
      .subscribe(command => {
        this.command = command;
        this.updateCommandFeedback()
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  check(command: string, ...parameters: string[]): boolean {
    return this.commandContentCheckerService.check(command, ...parameters);
  }

  checkQuiet() {
    return this.check(this.command!, '-q', '--quiet');
  }

  checkBare() {
    return this.check(this.command!, '--bare');
  }

  updateCommandFeedback(): void {
    if (this.checkQuiet()) {
      this.commandFeedbackService.setFeedback('');
      return;
    }
    this.commandFeedbackService.setFeedback(`Initialized empty Git repository in ${this.projectHome}`);
  }
}
