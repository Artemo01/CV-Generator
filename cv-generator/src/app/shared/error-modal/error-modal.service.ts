import { Injectable, ViewContainerRef } from '@angular/core';
import {
  ErrorModalComponent,
  ErrorModalParametres,
} from './error-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorModalService {
  public rootVewRef!: ViewContainerRef;
  constructor() {}

  public displayModalError(
    partialParameters: Partial<ErrorModalParametres>
  ): void {
    this.createErrorModal(partialParameters);
  }

  private createErrorModal(
    partialParameters: Partial<ErrorModalParametres>
  ): void {
    const errorModalComponentRef =
      this.rootVewRef.createComponent(ErrorModalComponent);
    const errorModal = errorModalComponentRef.instance;

    errorModal.setErrorParameters(partialParameters);
  }
}
