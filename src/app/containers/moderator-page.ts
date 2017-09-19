import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store/';
import { ConfGetSetupStart, ConfExit } from '../store/conference/conference.actions';
import { Participant } from '../store/participants/participants.reducers';

@Component({
    selector: 'app-moderator-page',
    template: `
    <app-topnav></app-topnav>
    <app-moderator-layout>
        
        <app-basic-control basicControl></app-basic-control>
        <app-control-chat chat></app-control-chat>
        <app-questions-layout questions></app-questions-layout>
        <app-calllistener tabs></app-calllistener>        
        
        <!--
        <div basicControl>Basic</div>
        <div chat>Chat</div>
        <div questions>Questions</div>
        <div tabs>Tabs</div>
        -->
        <app-participants participants
            [participants]="participants$ | async"
            [selectedParticipant]="selectedParticipant$ | async">
        </app-participants>
    </app-moderator-layout>
    `,
    styles: [`
    :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    `]
})
export class ModeratorPage {
    public participants$: Observable<Participant[]>;
    public selectedParticipant$: Observable<Participant>;

    ngOnInit() {
        this.store.dispatch(new ConfGetSetupStart);
    }

    ngOnDestroy() {
        this.store.dispatch(new ConfExit);
    }

    constructor(
        private store: Store<fromRoot.State>,
    ) {
        this.participants$ = this.store.select(fromRoot.getParticipantArray);
        this.selectedParticipant$ = this.store.select(fromRoot.getSelectedParticipant);
    }
}
