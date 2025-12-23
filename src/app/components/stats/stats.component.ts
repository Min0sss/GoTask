import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import Chart from 'chart.js/auto';

@Component({
  standalone: true,
  selector: 'app-stats',
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, AfterViewInit {

  private tasks: Task[] = [];
  private charts: Chart[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getAll();
  }

  ngAfterViewInit() {
    setTimeout(() => this.renderCharts(), 60);
  }

  private destroyCharts() {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
  }

  private renderCharts() {
    this.destroyCharts();
    this.loadStatusChart();
    this.loadPriorityChart();
    this.loadTagChart();
    this.loadCompletedHistory();
  }

  // CHART: STATUS
  loadStatusChart() {
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.charts.push(
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Pending', 'In Progress', 'Completed'],
          datasets: [{
            data: [
              this.tasks.filter(t => t.status === 'pending').length,
              this.tasks.filter(t => t.status === 'in-progress').length,
              this.tasks.filter(t => t.status === 'completed').length
            ],
            backgroundColor: ['#3b82f6', '#f59e0b', '#10b981']
          }]
        }
      })
    );
  }

  // CHART: PRIORITY
  loadPriorityChart() {
    const ctx = document.getElementById('priorityChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.charts.push(
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Low', 'Medium', 'High'],
          datasets: [{
            label: 'Count',
            data: [
              this.tasks.filter(t => t.priority === 'low').length,
              this.tasks.filter(t => t.priority === 'medium').length,
              this.tasks.filter(t => t.priority === 'high').length
            ],
            backgroundColor: ['#60a5fa', '#818cf8', '#a855f7']
          }]
        }
      })
    );
  }

  // CHART: TAGS
  loadTagChart() {
    const ctx = document.getElementById('tagChart') as HTMLCanvasElement;
    if (!ctx) return;

    const tagCount: Record<string, number> = {};

    this.tasks.forEach(t => {
      t.tags?.forEach((tag: string) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

    this.charts.push(
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(tagCount),
          datasets: [{
            data: Object.values(tagCount),
            backgroundColor: [
              '#3b82f6', '#8b5cf6', '#10b981',
              '#f59e0b', '#ef4444', '#6366f1'
            ]
          }]
        }
      })
    );
  }

  // CHART: HISTORY (Last 7 Days)
  loadCompletedHistory() {
    const ctx = document.getElementById('historyChart') as HTMLCanvasElement;
    if (!ctx) return;

    const days = [...Array(7).keys()].map(i => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString();
    });

    const data = days.map(day =>
      this.tasks.filter(t =>
        t.status === 'completed' &&
        t.dueDate &&
        new Date(t.dueDate).toLocaleDateString() === day
      ).length
    );

    this.charts.push(
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: days,
          datasets: [{
            label: 'Completed Tasks',
            data,
            borderColor: '#8b5cf6',
            tension: 0.3
          }]
        }
      })
    );
  }

  exportExcel() {
    this.taskService.exportToExcel();
  }

  exportPDF() {
    this.taskService.exportToPDF();
  }
}