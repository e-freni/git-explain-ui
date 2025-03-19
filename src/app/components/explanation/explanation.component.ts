import { NgComponentOutlet, NgIf } from '@angular/common';
import { Component, OnInit, Type } from '@angular/core';
import { CommandService } from '../../services/command.service';

@Component({
  selector: 'app-explanation',
  imports: [
    NgIf,
    NgComponentOutlet
  ],
  templateUrl: './explanation.component.html',
  styleUrl: './explanation.component.css'
})
export class ExplanationComponent implements OnInit {

  // TODO create components for each command to manage every case with every single case(even corners)

  lastCommand: string | null = '';
  currentComponent: Type<any> | null = null;

  constructor(private commandService: CommandService) {
  }

  ngOnInit() {
    this.commandService.currentComponent$.subscribe(currentComponent => {
      this.currentComponent = currentComponent;
    });
  }

}
