import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  tasks$;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  delete(id: string) {
    this.taskService.deletePermanent(id);
  }
}