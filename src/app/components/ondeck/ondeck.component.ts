import {Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Modal} from 'angular2-modal/plugins/bootstrap';
import * as fromRoot from '../../store';
import * as fromUi from '../../store/ui/ui.actions';
import * as fromQuestion from '../../store/questions/questions.actions';
import { Question } from '../../store/questions/questions.reducers';

@Component({
    selector: 'app-ondeck',
    template: `<table class="table table-bordered" style="font-size: 10px;height: 10px; pa: 0 0 0 0">
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
                            <ngb-rating [(rate)]="currentRate">
                                <ng-template let-fill="fill">
                                    <span class="star" [class.filled]="fill === 100">&#9733;</span>
                                </ng-template>
                            </ngb-rating>
                            <!--star-rating-comp [starType]="'icon'" 
                                [hoverEnabled]="true"                               
                                (onClick)="onRatingClick($event, question)" 
                                [rating]="getRatingToDisplay(question.rating)"></star-rating-comp-->
                            </td>
                            <td>{{question.handRaisedTimestamp | date:'shortTime'}}</td>
                        </tr>
                    </tbody>
                </table>
            <app-ondeck-edit *ngIf="(selectedQuestion$ | async)?.id"
                [question]="selectedQuestion$ | async"
                (rescreen)="rescreen($event)"
                (live)="live($event)"
                (remove)="remove($event)"       
                (edit)="edit($event)"
                (cancel)="deselect($event)">
            </app-ondeck-edit>
    `,
})
export class OnDeckComponent {

    public questionUpdate$: Observable<Question[]>;
    public selectedQuestion$: Observable<Question | undefined>;
    public selectedQuestion: Question;
    public onDeckQuestionOrder$: Observable<string>;
    public onDeckQuestionOrder: string;
    question: Question;

    constructor(private store: Store<fromRoot.State>,
                private modal: Modal) {
        this.questionUpdate$ = this.store.select(fromRoot.getOnDeckQuestionUpdate);
        this.selectedQuestion$ = this.store.select(fromRoot.getOnDeckSelectedQuestion)
            .do(this.deselectOnDisconnect.bind(this)); // Deselect if selection is disconnecting.
        this.onDeckQuestionOrder$ = this.store.select(fromRoot.getOnDeckQuestionOrder);
    }

    ngOnInit() {
        console.log('Question ID: ',this.selectedQuestion);

    }

    private deselectOnDisconnect(question: Question): void {
        if (!!question && question.status === 4) {
            // this.deselect();
        }
    }

    select(questionId: number): void {
        this.store.dispatch(new fromUi.SelectOnDeckQuestion({id: questionId}));
    }

    deselect(): void {
        this.store.dispatch(new fromUi.DeselectOnDeckQuestion());
    }

    live(): void {
        this.store.dispatch(new fromQuestion.LiveQuestionStart({id: this.selectedQuestion.id}));
        this.deselect();
    }

    remove(): void {
        this.store.dispatch(new fromQuestion.RejectQuestionStart({id: this.selectedQuestion.id}));
    }

    /**
     * Button control questions
     */

    /*edit(question: Question): void {
        this.store.dispatch(new fromQuestion.UpdateStart(Object.assign({}, question)));
    }

    rescreen(): void {
        this.store.dispatch(new fromQuestion.RescreenStart({id: this.selectedQuestion.id}));
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
        this.store.dispatch(new fromQuestion.UpdateStart(Object.assign(question, {rating: event.rating})));
    }

    toggleRatingOrder() {
        let order = this.onDeckQuestionOrder;
        order = order === 'desc' ? 'asc' : 'desc';
        this.store.dispatch(new fromUi.SetOnDeckQuestionOrder({order: order}));
    }*/
}
