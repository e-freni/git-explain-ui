import { NgForOf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommandFeedbackService } from '../../services/command-feedback.service';
import { CommandService } from '../../services/command.service';

@Component({
  selector: 'app-terminal',
  imports: [
    FormsModule,
    NgForOf,
  ],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent implements OnInit {
  prompt = 'user@host:~$';
  currentCommand = '';
  terminalOutput: string[] = [];
  @ViewChild('inputField') inputField!: ElementRef;


  constructor(
    private commandService: CommandService,
    private commandFeedbackService: CommandFeedbackService,
  ) {}

  ngOnInit(): void {

    this.commandFeedbackService.terminalOutput$.subscribe(terminalOutput => {
      this.terminalOutput = terminalOutput;
    });
    }

  executeCommand() {
    if (this.currentCommand.trim() === '') return;

    const userCommand = `${this.prompt} ${this.currentCommand}`;
    this.commandFeedbackService.setFeedback(userCommand);

    this.processCommand(this.currentCommand);

    this.currentCommand = '';
  }

  focusInput() {
    this.inputField?.nativeElement.focus();
  }

  processCommand(command: string): void {
    command = command.trim();

    // TODO restore commands with dedicated components

    // if (command === 'clear') {
    //   this.terminalOutput = [];
    //   this.commandService.setCommand('');
    //   return '';
    // }
    // if (command.includes('ls')) {
    //   let visibleFiles = 'file1.txt  file2.txt';
    //   if(command.includes('-la')){
    //     return visibleFiles + " easter_egg_hidden_file.txt"
    //   }
    //   return visibleFiles;
    // }
    // if (command === 'pwd') {
    //   return `${this.projectHome}`;
    // }
    // if (command.includes('git init')) {
    //   this.commandService.setCommand(command);
    //   let confirmMessage = `Initialized empty Git repository in ${this.projectHome}`;
    //   return command.includes('-q')? '' : confirmMessage;
    // }

    const component = this.commandService.getComponentForCommand(command);

    if (component) {
      this.commandService.setCommand(command);
    }
    this.commandFeedbackService.setFeedbackByComponent(component, command);

  }
}
