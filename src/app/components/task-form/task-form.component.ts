import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {

  title = '';
  description = '';
  priority: Task['priority'] = 'low';
  status: Task['status'] = 'pending';
  dueDate = '';

  constructor(private taskService: TaskService) {}

  save() {
    if (!this.title.trim()) return;

    this.taskService.create({
      id: uuid(),
      title: this.title,
      description: this.description,
      priority: this.priority,
      status: this.status,
      dueDate: this.dueDate,
      tags: [] // Required by model
    });

    this.resetForm();
  }

  private resetForm() {
    this.title = '';
    this.description = '';
    this.priority = 'low';
    this.status = 'pending';
    this.dueDate = '';
  }
}