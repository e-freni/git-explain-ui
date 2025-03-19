import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommandContentCheckerService } from '../../../services/command-content-checker.service';
import { CommandService } from '../../../services/command.service';

@Component({
  selector: 'app-git-init',
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './git-init.component.html',
  styleUrl: './git-init.component.css'
})
export class GitInitComponent implements OnInit, OnDestroy {

  public command: string | null = '';
  private destroy$ = new Subject<void>();

  constructor(
    private commandService: CommandService,
    public commandContentCheckerService: CommandContentCheckerService
  ) {
  }

  ngOnInit(): void {
    this.commandService.command$
      .pipe(takeUntil(this.destroy$))
      .subscribe(command => {
      this.command = command;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  check(command:string, ...parameters: string[]): boolean {
    return this.commandContentCheckerService.check(command, ...parameters)
  }
}
