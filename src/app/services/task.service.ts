import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';
  private tasksSubject = new BehaviorSubject<Task[]>(this.load());
  tasks$ = this.tasksSubject.asObservable();

  private load(): Task[] {
    const data = localStorage.getItem(this.storageKey);
    const tasks: Task[] = data ? JSON.parse(data) : [];

    return tasks.map(t => ({
      ...t,
      tags: t.tags ?? [],
      archived: t.archived ?? false
    }));
  }

  private save(tasks: Task[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  private updateState(newTasks: Task[]) {
    this.tasksSubject.next(newTasks);
    this.save(newTasks);
  }

  getAll(): Task[] {
    return this.tasksSubject.value;
  }

  create(task: Task) {
    const tasks = this.tasksSubject.value;
    this.updateState([
      ...tasks,
      {
        ...task,
        tags: task.tags ?? [],
        archived: false
      }
    ]);
  }

  update(task: Task) {
    const updated = this.tasksSubject.value.map(t =>
      t.id === task.id ? { ...t, ...task } : t
    );
    this.updateState(updated);
  }

  archive(taskId: string) {
    this.updateState(
      this.tasksSubject.value.map(t =>
        t.id === taskId ? { ...t, archived: true } : t
      )
    );
  }

  unarchive(taskId: string) {
    this.updateState(
      this.tasksSubject.value.map(t =>
        t.id === taskId ? { ...t, archived: false } : t
      )
    );
  }

  deletePermanent(taskId: string) {
    this.updateState(
      this.tasksSubject.value.filter(t => t.id !== taskId)
    );
  }

  exportToExcel() {
    const data = this.tasksSubject.value;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    saveAs(new Blob([excelBuffer]), 'tasks.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF();
    const tasks = this.tasksSubject.value;

    const rows = tasks.map(t => [
      t.title || '',
      t.priority || '',
      t.status || '',
      t.dueDate || '',
      (t.tags && t.tags.length > 0) ? t.tags.join(', ') : ''
    ]);

    autoTable(doc, {
      head: [['Title', 'Priority', 'Status', 'Due Date', 'Tags']],
      body: rows
    });

    doc.save('tasks.pdf');
  }
}