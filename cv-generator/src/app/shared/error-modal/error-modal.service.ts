import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import {
  ErrorModalComponent,
  ErrorModalParametres,
} from './error-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorModalService {
  public rootVewRef!: ViewContainerRef;
  private currentModalRef?: ComponentRef<ErrorModalComponent>;

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

    this.currentModalRef = errorModalComponentRef;
    const errorModal = errorModalComponentRef.instance;

    errorModal.setErrorParameters(partialParameters);

    errorModal.closed.subscribe(() => {
      this.closeModal();
    });
  }

  private closeModal(): void {
    if (this.currentModalRef) {
      this.currentModalRef.destroy();
      this.currentModalRef = undefined;
    }
  }
}
