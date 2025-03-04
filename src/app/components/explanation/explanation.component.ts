import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommandService } from '../../services/command.service';

@Component({
  selector: 'app-explanation',
  imports: [
    NgIf
  ],
  templateUrl: './explanation.component.html',
  styleUrl: './explanation.component.css'
})
export class ExplanationComponent implements OnInit {

  // TODO create components for each command to manage every case with ever single case(even corners)

  lastCommand: string | null = '';

  constructor(private commandService: CommandService) {
  }

  ngOnInit() {
    // Sottoscrizione per ricevere aggiornamenti in tempo reale
    this.commandService.command$.subscribe(command => {
      this.lastCommand = command;
    });
  }

}
