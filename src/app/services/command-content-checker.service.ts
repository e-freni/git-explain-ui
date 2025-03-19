import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandContentCheckerService {

  constructor() { }

  check(command:string, ...parameters: string[]): boolean {
    return parameters.some(p => command.includes(p))
  }
}
