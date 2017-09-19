import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {QuestionStatus} from '../../models/events';
import {Question} from "../../store/questions/questions.reducers";
import * as fromRoot from '../../store/';
import * as fromUi from '../../store/ui/ui.actions';
import * as fromQuestion from '../../store/questions/questions.actions';
import * as fromParticipant from '../../store/participants/participants.actions';

@Component({
    selector: 'app-livequestions-table',
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
                        <th>Rating</th>
                        <th>Raised</th>
                    </tr>
            </thead>
                <tbody>
                   <tr *ngFor="let question of questionUpdate$ | async"
                            [class.userSelected]="question.id === (selectedQuestion$ | async)?.id"
                            [class.active]="question.id === (selectedQuestion$ | async)?.id"
                            (click)="select(question.id)">
                        <td>{{question.phoneNo}}</td>
                        <td>{{question.name}}</td>
                        <td>{{question.addressCity}}</td>
                        <td>{{question.addressState}}</td>  
                        <td>{{question.question}}</td>                 
                        <td>{{question.screenerNotes}}</td>            
                        <td>{{question.rating}}</td>
                        <td>{{question.handRaisedTimestamp | date:'shortTime'}}</td>
                    </tr>
                </tbody>
            </table>
    <app-live-questions-edit *ngIf="(selectedQuestion$ | async)?.id"
        [question]="selectedQuestion$ | async"
        (mute)="mute($event)"
        (saveQuestion)="updateQuestion($event)"
        (unmute)="unmute($event)"
        (hold)="hold($event)"
        (unhold)="unhold($event)"
        (hangup)="hangup($event)"
        (volume)="volume($event)"
        (cancel)="deselect($event)">
    </app-live-questions-edit>
    `,
})
export class LiveTableQuestionsComponent {
    constructor(private store: Store<fromRoot.State>) {
        this.questionUpdate$ = this.store.select(fromRoot.getQuestions);
        this.selectedQuestion$ = this.store.select(fromRoot.getSelectedQuestion)
            .do(this.deselectOnDisconnect.bind(this)); // Deselect if selection is disconnecting.
    }

    public questionUpdate$: Observable<Question[]>;
    public selectedQuestion$: Observable<Question | undefined>;
    public selectedQuestion: Question;

    private deselectOnDisconnect(question: Question): void {
        if (!!question && question.status === QuestionStatus.LIVE) { // Is this right, Posh?
            this.deselect();
        }
    }

    select(questionId: number): void {
        this.store.dispatch(new fromUi.SelectQuestion({id: questionId}));
    }

    deselect(): void {
        this.store.dispatch(new fromUi.DeselectQuestion());
    }

    mute(): void {
        this.store.dispatch(new fromParticipant.MuteStart({id: this.selectedQuestion.participantId}));
    }

    unmute(): void {
        this.store.dispatch(new fromParticipant.UnmuteStart({id: this.selectedQuestion.participantId}));
    }

    hold(): void {
        this.store.dispatch(new fromParticipant.HoldStart({id: this.selectedQuestion.participantId}));
    }

    unhold(): void {
        this.store.dispatch(new fromParticipant.UnholdStart({id: this.selectedQuestion.participantId}));
    }

    hangup(): void {
        this.store.dispatch(new fromParticipant.HangupStart({id: this.selectedQuestion.participantId}));
    }

    volume({volume}: {volume: number}): void {
        this.store.dispatch(new fromParticipant.SetVolumeStart({id: this.selectedQuestion.participantId, volume: volume}));
    }

    /*doneQuestion(): void{
        this.store.dispatch(new fromQuestion.DoneStart({id: this.selectedQuestion.id}));
    }*/

}
