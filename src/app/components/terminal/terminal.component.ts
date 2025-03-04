import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
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
  prompt = '$';
  currentCommand = '';
  terminalOutput: string[] = [];
  projectHome = "/home/user/opt/your-super-software-project/"


  constructor(private commandService: CommandService) {
  }

  // Simula l'esecuzione di un comando
  executeCommand() {
    if (this.currentCommand.trim() === '') return;

    const userCommand = `${this.prompt} ${this.currentCommand}`;
    this.terminalOutput.push(userCommand);

    const response = this.processCommand(this.currentCommand);
    this.terminalOutput.push(response);

    this.currentCommand = '';
  }

  processCommand(command: string): string {
    switch (command.trim()) {
      case 'help':
        return 'Available commands: help, clear, ls, pwd';
      case 'clear':
        this.terminalOutput = [];
        return '';
      case 'ls':
        return 'file1.txt  file2.txt  project/';
      case 'pwd':
        return `${this.projectHome}`;
      case 'git init':
        this.commandService.setCommand('git init')
        return `Initialized empty Git repository in ${this.projectHome}`;
      default:
        this.commandService.setCommand('')
        return `Command not found: ${command}`;
    }
  }
}
