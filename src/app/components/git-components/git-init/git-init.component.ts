import { NgIf } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Chart, Legend, LinearScale, LineElement, PointElement, ScatterController, Tooltip, } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Subject, takeUntil } from 'rxjs';
import { CommandContentCheckerService } from '../../../services/command-content-checker.service';
import { CommandFeedbackService } from '../../../services/command-feedback.service';
import { CommandService } from '../../../services/command.service';

Chart.register(ScatterController, LinearScale, PointElement, LineElement, Tooltip, Legend, ChartDataLabels);

@Component({
  selector: 'app-git-init',
  imports: [
    NgIf,
    TranslatePipe
  ],
  templateUrl: './git-init.component.html',
  styleUrl: './git-init.component.css'
})
export class GitInitComponent implements OnInit, OnDestroy, AfterViewInit {

  public command: string | null = '';
  private destroy$ = new Subject<void>();
  private projectHome = '/home/user/code/your-super-software-project/'; //TODO this variable should become dynamic in order to simulate OS behaviour

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
        this.updateCommandFeedback();
      });
  }


  ngAfterViewInit(): void {
    const ctxPullRequest = document.getElementById('gitChartPullRequest') as HTMLCanvasElement;
    const ctxGitFlow = document.getElementById('gitChartGitflow') as HTMLCanvasElement;
    const ctxInit = document.getElementById('gitChartInit') as HTMLCanvasElement;

    //TODO find a way to don't write all this boilercode
    new Chart(ctxGitFlow, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'main',
            data: [
              {x: 0, y: 0, label: 'init'},
              {x: 0, y: 4, label: 'merge on main'},
            ],
            showLine: true,
            borderColor: 'black',
            backgroundColor: '#0078ef',
            pointRadius: 7,
            borderWidth: 2,
            order: 1
          },
          {
            label: 'develop',
            data: [
              {x: 0, y: 0, label: 'init'},
              {x: 1, y: 1, label: 'start feature'},
              {x: 1, y: 2, label: 'wip feature'},
              {x: 1, y: 3, label: 'polish'},
              {x: 0, y: 4, label: 'merge on main'},
            ],
            showLine: true,
            borderColor: 'black',
            backgroundColor: '#6126e8',
            pointRadius: 7,
            borderWidth: 2,
            order: 2
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            align: 'right',
            anchor: 'center',
            offset: 28,
            formatter: function (value: { label: any; }) {
              return value.label;
            },
            color: 'black'
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                return context.raw.label;
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            min: -2,
            max: 3,
            type: 'linear',
            position: 'bottom',
            ticks: {
              stepSize: 1,
              callback: (val) => {
                if (val === 0) return 'main';
                if (val === 1) return 'develop';
                return '';
              },
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            max: 5,
            min: -1,
            type: 'linear',
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
      },
    });
    new Chart(ctxPullRequest, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'main',
            data: [
              {x: 0, y: 0, label: ''},
              {x: 0, y: 4, label: ''},
            ],
            showLine: true,
            borderColor: 'black',
            backgroundColor: '#0078ef',
            pointRadius: 7,
            borderWidth: 2,
            order: 1
          },
          {
            label: 'develop',
            data: [
              {x: 0, y: 0, label: ''},
              {x: 1, y: 1, label: 'work'},
              {x: 0.5, y: 2, label: ''},
              {x: 1, y: 3, label: 'work better'},
              {x: 0, y: 4, label: 'PR accepted'},
            ],
            showLine: true,
            borderColor: 'black',
            backgroundColor: '#6126e8',
            pointRadius: 7,
            borderWidth: 2,
            order: 2
          },
          {
            label: 'pr',
            data: [
              {x: 0.5 , y: 2, label: 'PR rejected'},
            ],
            showLine: true,
            borderColor: 'black',
            backgroundColor: '#ff0000',
            pointRadius: 7,
            borderWidth: 2,
            order: 1
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            align: 'right',
            anchor: 'center',
            offset: 20,
            formatter: function (value: { label: any; }) {
              return value.label;
            },
            color: 'black'
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                return context.raw.label;
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            min: -2,
            max: 3,
            type: 'linear',
            position: 'bottom',
            ticks: {
              stepSize: 1,
              callback: (val) => {
                if (val === 0) return 'main';
                if (val === 1) return '';
                if (val === 2) return 'develop';
                return '';
              },
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            max: 5,
            min: -1,
            type: 'linear',
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
      },
    });

    new Chart(ctxInit, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'main',
            data: [
              {x: 0, y: 0, label: 'first commit awaits'},
            ],
            showLine: true,
            borderColor: 'black',
            backgroundColor: '#89bdf1',
            pointRadius: 7,
            borderWidth: 1,
            order: 1
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            align: 'right',
            anchor: 'center',
            offset: 28,
            formatter: function (value: { label: any; }) {
              return value.label;
            },
            color: 'black'
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                return context.raw.label;
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            ticks: {
              stepSize: 1,
              callback: (val) => {
                if (val === 0) return 'main';
                return '';
              },
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            max: 5,
            min: -1,
            type: 'linear',
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
      },
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
