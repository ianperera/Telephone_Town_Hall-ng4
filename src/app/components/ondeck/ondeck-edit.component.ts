import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory} from 'angular2-modal';

import {Question} from "../../store/questions/questions.reducers";

@Component({
    selector: 'app-ondeck-edit',
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

            <ondeck-modal-component></ondeck-modal-component>
            <button type="button" class="btn btn-primary btn-sm" style="width: 80px"
                    (click)="rescreen.emit()">rescreen</button>
            <button type="button" class="btn btn-primary btn-sm" style="width: 80px"
                    (click)="live.emit()">live</button>
            <button type="button" class="btn btn-primary btn-sm" style="width: 80px"
                    (click)="remove.emit()">remove</button>
        </div>    
          <div class="col-md-1">
           <button type="button" class="btn btn-primary btn-sm" style="width: 80px"
                    (click)="cancel.emit()">close</button>
          <span style="color: darkred" class="glyphicon glyphicon-remove" (click)="cancel.emit()"></span>
          </div>
        </div>
    </div>
    `,
    styles: [`
        
    `]
})
export class OnDeckEditComponent {
    @Input() question: Question;
    @Output() cancelOndeck = new EventEmitter();
    @Output() saveOnDeckQuestion = new EventEmitter<Question>();
    @Output() rescreen = new EventEmitter();
    @Output() live = new EventEmitter();
    @Output() remove = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Output() edit = new EventEmitter<Question>();

    constructor(private modal: Modal) {
    }

    ngOnInit() {

    }


}
