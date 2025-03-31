import {NgIf} from '@angular/common';
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {CommandContentCheckerService} from '../../../services/command-content-checker.service';
import {CommandFeedbackService} from '../../../services/command-feedback.service';
import {CommandService} from '../../../services/command.service';
import {TranslatePipe} from '@ngx-translate/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart,
  ScatterController,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

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
  @ViewChild('gitGraphContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  public command: string | null = '';
  private destroy$ = new Subject<void>();
  private projectHome = "/home/user/code/your-super-software-project/" //TODO this variable should become dynamic in order to simulate OS behaviour

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
        this.updateCommandFeedback()
      });
  }


  ngAfterViewInit(): void {
    const ctx = document.getElementById('gitChart') as HTMLCanvasElement;

    //TODO find a way to don't write all this boilercode
    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'main',
            data: [
              { x: 0, y: 0, label: 'init' },
              { x: 0, y: 4, label: 'merge on main' },
            ],
            showLine: true,
            borderColor: 'black',
            backgroundColor: '#0078ef',
            pointRadius: 10,
            borderWidth: 2,
            order: 1
          },
          {
            label: 'develop',
            data: [
              { x: 0, y: 0, label: 'init' },
              { x: 1, y: 1, label: 'start feature' },
              { x: 1, y: 2, label: 'wip feature' },
              { x: 1, y: 3, label: 'polish' },
              { x: 0, y: 4, label: 'merge on main' },
            ],
            showLine: true,
            borderColor: 'black',
            backgroundColor: '#6126e8',
            pointRadius: 10,
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
