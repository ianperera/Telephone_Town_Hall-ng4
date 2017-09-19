import { Component } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/';
import { Question } from "../../store/questions/questions.reducers";
import * as fromUi from '../../store/ui/ui.actions';
import * as fromQuestion from '../../store/questions/questions.actions';
import * as fromParticipant from '../../store/participants/participants.actions';

@Component({
    selector: 'app-livequestions',
    templateUrl: './live-questions.tmpl.html',
    styleUrls: ['./live-questions.css']
})
export class LiveQuestionsComponent {
    public questions$: Observable<Question[]>;
    public selectedQuestion$: Observable<Question | undefined>;
    public selectedQuestion: Question;
    
    constructor(private store: Store<fromRoot.State>) {
        this.questions$ = this.store.select(fromRoot.getQuestions);
        this.selectedQuestion$ = this.store.select(fromRoot.getSelectedQuestion)
            .do(this.deselectOnDisconnect.bind(this)); // Deselect if selection is disconnecting.
    }

    private deselectOnDisconnect(question: Question): void {
        if (!!question && question.status === 16) {
            // this.deselect();
        }
    }

    select(questionId: number): void {
        this.store.dispatch(new fromUi.SelectQuestion({id: questionId}));
    }

    deselect(): void {
        this.store.dispatch(new fromUi.DeselectQuestion());
    }

    mute(question: Question): void {
        this.store.dispatch(new fromParticipant.MuteStart(question));
    }

    unmute(question: Question): void {
        this.store.dispatch(new fromParticipant.UnmuteStart({id: question.participantId}));
    }

    hold(question: Question): void {
        this.store.dispatch(new fromParticipant.HoldStart({id: question.participantId}));
    }

    unhold(question: Question): void {
        this.store.dispatch(new fromParticipant.UnholdStart({id: question.participantId}));
    }

    hangup(question: Question): void {
        this.store.dispatch(new fromParticipant.HangupStart({id: question.participantId}));
    }

    volume(question: Question, volume: number): void {
        this.store.dispatch(new fromParticipant.SetVolumeStart({id: question.participantId, volume}));
    }

    /*doneQuestion(question: Question): void{
        this.store.dispatch(new fromQuestion.DoneStart({id: question.participantId}));
    }*/
}
