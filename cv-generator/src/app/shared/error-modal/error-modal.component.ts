import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { defaultErrorParameters } from './error-modal.constants';
import { MatButtonModule } from '@angular/material/button';

export interface ErrorModalParametres {
  message: string;
  messageList: string[] | null;
}

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss',
})
export class ErrorModalComponent {
  public header = 'An error occured';
  public errorParameters: ErrorModalParametres;

  @Output() closed = new EventEmitter<void>();

  constructor() {
    this.errorParameters = defaultErrorParameters;
  }

  public setErrorParameters(
    partialParemeters: Partial<ErrorModalParametres>
  ): void {
    const parameters = defaultErrorParameters;

    if (partialParemeters.message != null) {
      parameters.message = partialParemeters.message;
    }
    if (partialParemeters.messageList != null) {
      parameters.messageList = partialParemeters.messageList;
    }

    this.errorParameters = parameters;
  }

  public close(): void {
    this.closed.emit();
  }
}
