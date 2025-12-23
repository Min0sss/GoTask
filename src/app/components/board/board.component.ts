import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import {
  CdkDropList,
  CdkDrag,
  DragDropModule,
  CdkDragDrop
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    TaskModalComponent,
    CdkDropList,
    CdkDrag,
    DragDropModule
  ],
  templateUrl: './board.component.html'
})
export class BoardComponent {
  private allTasks: Task[] = [];

  searchText = '';
  filterPriority: 'all' | 'low' | 'medium' | 'high' = 'all';
  filterStatus: 'all' | 'pending' | 'in-progress' | 'completed' = 'all';
  filterDue: 'all' | 'today' | 'week' | 'overdue' = 'all';
  filterTag: string = 'all';

  allTags: string[] = [];

  pending: Task[] = [];
  inProgress: Task[] = [];
  completed: Task[] = [];

  modalTask: Task | null = null;

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe((tasks) => {
      this.allTasks = tasks;
      this.allTags = [...new Set(tasks.flatMap(t => t.tags || []))];
      this.applyFilters();
    });
  }

  applyFilters() {
    const text = this.searchText.toLowerCase();
    const p = this.filterPriority;
    const s = this.filterStatus;
    const d = this.filterDue;
    const tag = this.filterTag;

    const active = this.allTasks.filter(t => !t.archived);

    const filtered = active.filter((t) => {
      const title = t.title?.toLowerCase() ?? '';
      const desc = t.description?.toLowerCase() ?? '';

      const matchText = !text || title.includes(text) || desc.includes(text);
      const matchPriority = p === 'all' ? true : t.priority === p;
      const matchStatus = s === 'all' ? true : t.status === s;
      const matchDue = this.matchesDue(t.dueDate, d);
      const matchTag = tag === 'all' ? true : (t.tags?.includes(tag));

      return matchText && matchPriority && matchStatus && matchDue && matchTag;
    });

    this.pending = filtered.filter(t => t.status === 'pending');
    this.inProgress = filtered.filter(t => t.status === 'in-progress');
    this.completed = filtered.filter(t => t.status === 'completed');
  }

  private matchesDue(dueDate: string | undefined, filter: 'all' | 'today' | 'week' | 'overdue'): boolean {
    if (filter === 'all') return true;
    if (!dueDate) return false;

    const today = new Date();
    const baseToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    const d = new Date(dueDate);
    const baseDue = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

    if (filter === 'today') return baseDue === baseToday;
    if (filter === 'overdue') return baseDue < baseToday;

    if (filter === 'week') {
      const twoWeeks = baseToday + 14 * 24 * 60 * 60 * 1000;
      return baseDue >= baseToday && baseDue <= twoWeeks;
    }

    return true;
  }

  updateSearch(v: string) {
    this.searchText = v;
    this.applyFilters();
  }

  updatePriority(v: string) {
    this.filterPriority = v as any;
    this.applyFilters();
  }

  updateStatus(v: string) {
    this.filterStatus = v as any;
    this.applyFilters();
  }

  updateDue(v: string) {
    this.filterDue = v as any;
    this.applyFilters();
  }

  updateTag(v: string) {
    this.filterTag = v;
    this.applyFilters();
  }

  openModal(task: Task) {
    this.modalTask = task;
  }

  closeModal() {
    this.modalTask = null;
  }

  archive(task: Task) {
    this.taskService.archive(task.id);
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: Task['status']) {
    const task = event.item.data as Task;
    if (!task) return;

    if (task.status === newStatus) return;

    const updated: Task = {
      ...task,
      status: newStatus
    };

    this.taskService.update(updated);
  }
}