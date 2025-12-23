import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  defaultTags = ['Work', 'Study', 'Personal', 'Health', 'Urgent'];

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description],
      priority: [this.task.priority, Validators.required],
      status: [this.task.status, Validators.required],
      dueDate: [this.task.dueDate],
      tags: [this.task.tags ?? []]
    });
  }

  submit() {
    if (this.form.invalid) return;

    const updated: Task = {
      ...this.task,
      ...this.form.value
    };

    this.taskService.update(updated);
    this.close.emit();
  }

  deleteTask() {
    this.taskService.deletePermanent(this.task.id);
    this.close.emit();
  }

  toggleTag(tag: string) {
    const tags: string[] = [...this.form.value.tags];

    if (tags.includes(tag)) {
      this.form.patchValue({ tags: tags.filter(t => t !== tag) });
    } else {
      this.form.patchValue({ tags: [...tags, tag] });
    }
  }

  addCustomTag(event: any) {
    const value = event.target.value.trim();
    if (!value) return;

    const tags: string[] = [...this.form.value.tags];

    if (!tags.includes(value)) {
      this.form.patchValue({ tags: [...tags, value] });
    }

    event.target.value = '';
  }

  removeTag(tag: string) {
    const newTags = this.form.value.tags.filter((t: string) => t !== tag);
    this.form.patchValue({ tags: newTags });
  }
}