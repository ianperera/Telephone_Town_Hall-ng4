import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { overlayConfigFactory } from 'angular2-modal';
// import { ScreenedEditModal } from "../screened/screened-edit.modal";

import * as fromRoot from '../../store';
import * as fromUi from '../../store/ui/ui.actions';
import * as fromQuestion from '../../store/questions/questions.actions';
import { Question } from '../../store/questions/questions.reducers';

@Component({
    selector: 'app-screened',
    template: `
            <table class="table table-bordered" style="font-size: 10px;height: 10px">
                    <thead>
                        <tr>
                            <th>Phone#</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Question</th>
                            <th>Notes</th>
                            <th (click)="toggleRatingOrder()" style="cursor: pointer;">Rating {{ (screenedQuestionOrder$ | async) === 'desc' ? "&#x2193;" : "&#x2191;" }}</th>
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
                            <td>{{question.question}}</td>                 
                            <td>{{question.screenerNotes}}</td>            
                            <td>
                            <!--star-rating-comp [starType]="'icon'" 
                                [hoverEnabled]="true"                               
                                (onClick)="onRatingClick($event, question)" 
                                [rating]="getRatingToDisplay(question.rating)"></star-rating-comp-->
                            </td>
                            <td>{{question.handRaisedTimestamp | date:'shortTime'}}</td>
                        </tr>
                    </tbody>
                </table>
            <app-screened-edit *ngIf="(selectedQuestion$ | async)?.id"
                [question]="selectedQuestion$ | async"
                (ondeck)="ondeck($event)"
                (live)="live($event)"
                (remove)="remove($event)"       
                (edit)="edit($event)"
                (cancel)="deselect($event)">
            </app-screened-edit>
    `,
})
export class ScreenedComponent {

    public questionUpdate$: Observable<Question[]>;
    public selectedQuestion$: Observable<Question | undefined>;
    public selectedQuestion: Question;
    public screenedQuestionOrder$: Observable<string>;
    public screenedQuestionOrder: string;
    question: Question;

    constructor(private store: Store<fromRoot.State>,
                private modal: Modal) {
        this.questionUpdate$ = this.store.select(fromRoot.getScreenedQuestionUpdate);
        this.selectedQuestion$ = this.store.select(fromRoot.getScreenedSelectedQuestion)
            .do(this.deselectOnDisconnect.bind(this)); // Deselect if selection is disconnecting.
        this.screenedQuestionOrder$ = this.store.select(fromRoot.getScreenedQuestionOrder);
    }

    private deselectOnDisconnect(question: Question): void {
        if (!!question && question.status === 4) {
            // this.deselect();
        }
    }

    select(questionId: number): void {
        this.store.dispatch(new fromUi.SelectScreenedQuestion({id: questionId}));
    }

    deselect(): void {
        this.store.dispatch(new fromUi.DeselectScreenedQuestion());
    }

    /**
     * Button control questions
     */

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
    }

    getRatingToDisplay(rating) {
        if (rating && rating > 99) {
            rating = rating - 100;
        } else if (!rating) {
            rating = 0;
        }

        return rating;
    }

    onRatingClick(event, question: Question) {
        this.store.dispatch(new fromQuestion.UpdateStart(Object.assign(question, {rating: event.rating + 100})));
    }

    toggleRatingOrder() {
        let order = this.screenedQuestionOrder;
        order = order === 'desc' ? 'asc' : 'desc';
        this.store.dispatch(new fromUi.SetScreenedQuestionOrder({order: order}));
    }*/
}
