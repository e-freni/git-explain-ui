import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
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
export class GitInitComponent {

  public command: string | null = ''

  constructor(private commandService: CommandService) {
    commandService.command$.subscribe(command => {
      this.command = command;
    })
  }

}
