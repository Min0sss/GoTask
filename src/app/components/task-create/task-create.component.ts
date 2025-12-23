import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  @Output() close = new EventEmitter<void>();

  title = '';
  description = '';
  priority: Task['priority'] = 'low';
  status: Task['status'] = 'pending';
  dueDate: string = '';

  tags: string[] = [];
  newTag = '';
  defaultTags = ['Work', 'Study', 'Personal', 'Health', 'Urgent'];

  constructor(private taskService: TaskService) {}

  addCustomTag() {
    const value = this.newTag.trim();
    if (!value) return;

    if (!this.tags.includes(value)) {
      this.tags.push(value);
    }
    this.newTag = '';
  }

  toggleTag(tag: string) {
    if (this.tags.includes(tag)) {
      this.tags = this.tags.filter(t => t !== tag);
    } else {
      this.tags.push(tag);
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  createTask() {
    if (!this.title.trim()) return;

    const newTask: Task = {
      id: uuid(),
      title: this.title,
      description: this.description,
      priority: this.priority,
      status: this.status,
      dueDate: this.dueDate,
      tags: this.tags
    };

    this.taskService.create(newTask);
    this.close.emit();
  }
}