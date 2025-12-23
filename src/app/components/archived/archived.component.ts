import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-archived',
  standalone: true,
  imports: [CommonModule, ConfirmModalComponent],
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent {
  archived: Task[] = [];
  confirmDeleteId: string | null = null;

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe(tasks => {
      this.archived = tasks.filter(t => t.archived);
    });
  }

  restore(id: string) {
    this.taskService.unarchive(id);
  }

  askDelete(id: string) {
    this.confirmDeleteId = id;
  }

  handleConfirm(result: boolean) {
    if (result && this.confirmDeleteId) {
      this.taskService.deletePermanent(this.confirmDeleteId);
    }
    this.confirmDeleteId = null;
  }
}