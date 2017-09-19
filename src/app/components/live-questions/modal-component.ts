import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    template: `
<div class="modal-header">         
      <h4 class="modal-title">Edit Question</h4>
    </div>  
    <form class="mb-0" autocomplete="off" (submit)="formSubmit($event)">
       <div class="panel mb-0">
        <div class="panel-body" style="margin: 20px 20px 0 20px;">
        <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="firstName">Question:</label>
                <textarea class="form-control input-sm" id="question"></textarea>
              </div>
              <div class="form-group">
                <label for="firstName">Notes:</label>
                <textarea class="form-control input-sm" id="screenerNotes" ></textarea>
              </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>Name:</label>
                </div>
                <div class="form-group">
                    <label>Address: {{address}} </label>
                </div>
                <div class="form-group">
                    <label>Raised Hand: </label>
                </div>            
            </div>
        </div>
        </div>
        <div class="panel-footer text-right" style="margin: 0 20px 20px 0;">                
            <button type="submit" class="btn btn-primary">Done</button>
            <button type="button" class="btn btn-default" (click)="reset()">Reset</button>
            <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
        </div>
      </div>
    </form>
    
  `
})
export class NgbdModalContent {
    @Input() name;

    constructor(public activeModal: NgbActiveModal) {}
}

@Component({
    selector: 'ngbd-modal-component',
    templateUrl: './modal-component.html'
})

export class NgbdModalComponent {
    constructor(private modalService: NgbModal) {}

    open() {
        const modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.name = 'World';
        modalRef.componentInstance.address = 'CA';
    }

    formSubmit(event): void {

    }

    reset(): void {
    }
}