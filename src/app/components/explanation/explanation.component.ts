import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommandService } from '../../services/command.service';
import { GitInitComponent } from '../git-components/git-init/git-init.component';

@Component({
  selector: 'app-explanation',
  imports: [
    NgIf,
    GitInitComponent
  ],
  templateUrl: './explanation.component.html',
  styleUrl: './explanation.component.css'
})
export class ExplanationComponent implements OnInit {

  // TODO create components for each command to manage every case with every single case(even corners)

  lastCommand: string | null = '';

  constructor(private commandService: CommandService) {
  }

  ngOnInit() {
    this.commandService.command$.subscribe(command => {
      this.lastCommand = command;
    });
  }

}
