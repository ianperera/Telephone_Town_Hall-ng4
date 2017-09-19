import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

/**
 * This modal should get some alert styling.
 */

@Component({
  selector: 'app-alert-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{title}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{message}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close()">Close</button>
    </div>
  `
})
export class AlertModal {
  @Input() title: string = 'Default Title';
  @Input() message: string = 'Default Message';
  constructor(public activeModal: NgbActiveModal) {}
}