import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskCreateComponent } from './components/task-create/task-create.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TaskCreateComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {

  showCreate = false;

  openCreateModal() {
    this.showCreate = true;
  }

  closeCreateModal() {
    this.showCreate = false;
  }
}