import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory} from 'angular2-modal';
import {QuestionData} from "../../models/events";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-raisedhand-edit',
    template: `
    <div class="panel-body">
        <div class="row">
            <div class="col-md-6">
            <div class="form-group">
                <label>Question:</label>
                 <div style="border: 1px solid black; height: 10%; width: 80%; text-decoration:underline;">
                   {{ question.question }}
                </div>
            </div>
            <div class="form-group">
                <label>Notes:</label>
                 <div style="border: 1px solid black; height: 10%; width: 80%; text-decoration:underline;">
                    {{ question.screenerNotes }}
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="form-group">
                <label>Name: {{ question.name }}</label>
            </div>
            <div class="form-group">
                <label>Address: {{ question.addressZip }} {{ question.addressCity  }} {{ question.addressState }}</label>
            </div>
            <div class="form-group">
                <label>Raised Hand: {{question.handRaisedTimestamp | date:'shortTime'}}</label>
            </div>

            <raisedhand-modal-component></raisedhand-modal-component>
            <button type="button" class="btn btn-primary btn-sm" style="width: 100px;"
                    (click)="openOndeck(ondeck)">on deck
            </button>
            <button type="button" class="btn btn-primary btn-sm" style="width: 100px;"
                    (click)="openLive(live)">live
            </button>
            <button type="button" class="btn btn-primary btn-sm" style="width: 100px;"
                    (click)="openRemove(remove)">remove
            </button>
        </div>    
          <div class="col-md-1">
          <button type="button" class="btn btn-primary btn-sm" style="width: 80px"
                    (click)="cancel.emit()">close</button>
          <span style="color: darkred" class="glyphicon glyphicon-remove" (click)="cancel.emit()"></span>
          </div>
        </div>
    </div>
    
    <!-- modal OnDeck confirmation -->
    <ng-template #ondeck let-c="close" let-d="dismiss">
  <div class="modal-header">
    <h4 class="modal-title">Please Confirm Un-screened Question</h4>
    <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Do you really to bring this UN-SCREENED listener on deck?</p>
  </div>
  <div class="modal-footer">
    <button type="button" (click)="ondeck.emit()" class="btn btn-primary" data-dismiss="modal">Yes</button>
    <button type="button" class="btn btn-outline-dark" (click)="c('Close click')">Close</button>
  </div>
</ng-template>
        
    <!-- modal Live confirmation -->
    <ng-template #live let-c="close" let-d="dismiss">
  <div class="modal-header">
    <h4 class="modal-title">Please Confirm Un-screened Question</h4>
    <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Do you really want to go live with this UN-SCREENED listener?</p>
  </div>
  <div class="modal-footer">
    <button type="button" (click)="live.emit()" class="btn btn-primary" data-dismiss="modal">Yes</button>
    <button type="button" class="btn btn-outline-dark" (click)="c('Close click')">Close</button>
  </div>
</ng-template>

    
    <!-- modal Remove confirmation -->
        <ng-template #remove let-c="close" let-d="dismiss">
  <div class="modal-header">
    <h4 class="modal-title">Please Confirm Un-screened Question</h4>
    <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Do you want to remove this question and send the listener back to the conference?</p>
  </div>
  <div class="modal-footer">
    <button type="button" (click)="remove.emit()" class="btn btn-primary" data-dismiss="modal">Yes</button>
    <button type="button" class="btn btn-outline-dark" (click)="c('Close click')">Close</button>
  </div>
</ng-template>
   
    `,
    styles: [`
        
    `]
})
export class RaisedHandEditComponent {
    @Input() question: QuestionData;
    @Output() ondeck = new EventEmitter();
    @Output() live = new EventEmitter();
    @Output() remove = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Output() edit = new EventEmitter<QuestionData>();

    closeResultEdit: string;
    closeResultOndeck: string;
    closeResultLive: string;
    closeResultRemove: string;

    constructor(private modal: Modal,
                private modalService: NgbModal) {
    }

    ngOnInit() {

    }

    openOndeck(ondeck) {
        this.modalService.open(ondeck).result.then((result) => {
            this.closeResultOndeck = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResultOndeck = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openLive(live) {
        this.modalService.open(live).result.then((result) => {
            this.closeResultLive = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResultLive = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openRemove(remove) {
        this.modalService.open(remove).result.then((result) => {
            this.closeResultRemove = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResultRemove = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
}
