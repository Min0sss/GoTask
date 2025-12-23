import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Input() message: string = 'Confirm action?';
  @Output() confirm = new EventEmitter<boolean>();

  accept() {
    this.confirm.emit(true);
  }

  cancel() {
    this.confirm.emit(false);
  }
}