import { NgForOf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommandService } from '../../services/command.service';

@Component({
  selector: 'app-terminal',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent {
  prompt = 'user@host:~$';
  currentCommand = '';
  terminalOutput: string[] = [];
  projectHome = "/home/user/opt/your-super-software-project/"
  @ViewChild('inputField') inputField!: ElementRef;


  constructor(private commandService: CommandService) {
  }

  executeCommand() {
    if (this.currentCommand.trim() === '') return;

    const userCommand = `${this.prompt} ${this.currentCommand}`;
    this.terminalOutput.push(userCommand);

    const response = this.processCommand(this.currentCommand);
    this.terminalOutput.push(response);

    this.currentCommand = '';
  }

  focusInput() {
    this.inputField?.nativeElement.focus();
  }

  processCommand(command: string): string {
    command = command.trim();

    // TODO find another solution that if chain is horrible
    if (command === 'help') {
      return 'Available commands: help, clear, ls and git commands, of course';
    }
    if (command === 'clear') {
      this.terminalOutput = [];
      this.commandService.setCommand('');
      return '';
    }
    if (command.includes('ls')) {
      let visibleFiles = 'file1.txt  file2.txt';
      if(command.includes('-la')){
        return visibleFiles + " easter_egg_hidden_file.txt"
      }
      return visibleFiles;
    }
    if (command === 'pwd') {
      return `${this.projectHome}`;
    }
    if (command.includes('git init')) {
      this.commandService.setCommand(command);
      let confirmMessage = `Initialized empty Git repository in ${this.projectHome}`;
      return command.includes('-q')? '' : confirmMessage;
    }
    {
      this.commandService.setCommand('');
      return `Command not found: ${command}`;
    }
  }
}
