import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { overlayConfigFactory } from 'angular2-modal';
// import { RaisedHandEditModal } from "../raisedhand/raisedhand-edit.modal";

import * as fromRoot from '../../store';
import * as fromUi from '../../store/ui/ui.actions';
import * as fromQuestion from '../../store/questions/questions.actions';
import { Question } from '../../store/questions/questions.reducers';

@Component({
    selector: 'app-raisedhand',
    template: `<table class="table table-bordered" style="font-size: 10px;height: 10px">
                <thead>
                    <tr>
                        <th>Phone#</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Status</th>
                        <th>Screener</th>
                        <th>Raised</th>
                    </tr>
            </thead>
                <tbody>
                   <tr *ngFor="let question of questionUpdate$ | async"
                            [class.active]="question.id === (selectedQuestion$ | async)?.id"
                            (click)="select(question.id)">
                        <td>{{question.phoneNo}}</td>
                        <td>{{question.name}}</td>
                        <td>{{question.addressCity}}</td>
                        <td>{{question.addressState}}</td>  
                        <td>un-screened: {{question.screenerNotes}}</td>                 
                        <td>{{question.screenerName}}</td>
                        <td>{{question.handRaisedTimestamp | date:'shortTime'}}</td>
                    </tr>
                </tbody>
            </table>
            <app-raisedhand-edit *ngIf="(selectedQuestion$ | async)?.id"
                [question]="selectedQuestion$ | async"
                (ondeck)="ondeck($event)"
                (live)="live($event)"
                (remove)="remove($event)"       
                (edit)="edit($event)"
                (cancel)="deselect($event)">
            </app-raisedhand-edit>
    `,
})
export class RaisedHandComponent {

    public questionUpdate$: Observable<Question[]>;
    public selectedQuestion$: Observable<Question | undefined>;
    public selectedQuestion: Question;
    question: Question;

    constructor(private store: Store<fromRoot.State>,
                private modal: Modal) {
        this.questionUpdate$ = this.store.select(fromRoot.getRaisedHandQuestionUpdate);
        this.selectedQuestion$ = this.store.select(fromRoot.getRaisedHandSelectedQuestion)
            .do(this.deselectOnDisconnect.bind(this)); // Deselect if selection is disconnecting.
    }

    ngOnInit() {
        console.log('Question ID: ',this.selectedQuestion.id);

    }

    private deselectOnDisconnect(question: Question): void {
        if (!!question && (question.status === 1 || question.status === 2)) {
            // this.deselect();
        }
    }

    select(questionId: number): void {
        this.store.dispatch(new fromUi.SelectRaisedHandQuestion({id: questionId}));
    }

    deselect(): void {
        this.store.dispatch(new fromUi.DeselectRaisedHandQuestion());
    }

    /*edit(question: Question): void {
        this.store.dispatch(new fromQuestion.UpdateStart(Object.assign({}, question)));
    }


    ondeck(): void {
        this.store.dispatch(new fromQuestion.OnDeckStart({id: this.selectedQuestion.id}));
        this.deselect();
    }

    live(): void {
        this.store.dispatch(new fromQuestion.BringLiveStart({id: this.selectedQuestion.id}));
        this.deselect();
    }

    remove(): void {
        this.store.dispatch(new fromQuestion.RemoveQuestionStart({id: this.selectedQuestion.id}));

    }*/
}
