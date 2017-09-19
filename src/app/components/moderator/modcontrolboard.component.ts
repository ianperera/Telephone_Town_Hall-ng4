import {AfterViewInit, Component, OnInit, OnDestroy, ViewChild, EventEmitter, Output} from '@angular/core';
import {EventService} from "../../shared/event-streamer/events.service";
import {Subscription} from "rxjs";
import {MainControlService} from '../maincontrol.service';
import {Modal} from 'angular2-modal/plugins/bootstrap';

import { Observable } from 'rxjs/Observable';
import { last } from 'lodash';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/';
import { ConfGetSetupStart, ConfExit } from '../../store/conference/conference.actions';
import { ConferenceSetup } from '../../models/conference';
import { ListenerSummaryEvent, CampaignStatsEvent, ConferenceStatusEvent } from '../../models/events';
import { Participant } from '../../store/participants/participants.reducers';

import * as EventTypes from '../../shared/event-streamer/event.interfaces';
import {ChatComponent} from "../chat/chat.component";
import {BasicControlComponent} from "../basic-control/basic-control.component";
import {PollingComponent} from "../polling/polling.component";
import {ListenersComponent} from "../listeners/listeners.component";
import {CallParticipantComponent} from "../call-participant/call-participant.component";
import {CallProgressComponent} from "../call-progress/call-progress.component";
import {LiveQuestionsComponent} from "../live-questions/live-questions.component";

/**
 * Goals for using ngrx:
 * 1. Remove ViewChild references to make this component a little dumber
 * 2. Access store observables in this component
 * 3. Pass values to child components using 'asdf$ | async'
 * 4. Get rid of switch statement in this component
 */

@Component({
    selector: 'app-modcontrolboard',
    templateUrl: './modControlBoardComponent.tmpl.html',
    styleUrls: ['./modcontrolboard.css']
})
export class ModControlBoardComponent implements OnInit, OnDestroy {
    @ViewChild(ChatComponent) chatComponent: ChatComponent;
    @ViewChild(BasicControlComponent) basicControlComponent: BasicControlComponent;
    @ViewChild(PollingComponent) pollingComponent: PollingComponent;
    @ViewChild(ListenersComponent) listenersComponent: ListenersComponent;
    @ViewChild(CallParticipantComponent) callParticipantComponent: CallParticipantComponent;
    @ViewChild(CallProgressComponent) callProgressComponent: CallProgressComponent;
    @ViewChild(LiveQuestionsComponent) liveQuestionsComponent: LiveQuestionsComponent;
    @Output() refreshStream: EventEmitter<string> = new EventEmitter<string>();

    public confSetup$: Observable<ConferenceSetup>;
    public confStatus$: Observable<ConferenceStatusEvent>;
    public confInitialized$: Observable<boolean>;
    public participants$: Observable<Participant[]>;
    public minutesLeft$: Observable<number>;
    public listenerStats$: Observable<ListenerSummaryEvent[]>;
    public latestCampaignStats$: Observable<CampaignStatsEvent>;
    public pollStats$: Observable<any>;
    public listenerStatsLastTen$: Observable<ListenerSummaryEvent[]>;

    public liveview: boolean = true;

    constructor(
        private eventService: EventService,
        private modal: Modal,
        private mainControlService: MainControlService,
        private store: Store<fromRoot.State>
    ) {
        this.confSetup$ = this.store.select(fromRoot.getConfSetup);
        this.confStatus$ = this.store.select(fromRoot.getConfStatus);
        this.confInitialized$ = this.store.select(fromRoot.getConfInitialized);
        this.participants$ = this.store.select(fromRoot.getParticipantArray);
        this.minutesLeft$ = this.store.select(fromRoot.getMinutesLeft);
        this.listenerStats$ = this.store.select(fromRoot.getListenerStats)
        this.latestCampaignStats$ = this.store.select(fromRoot.getCampaignStats)
            .map(stats => last(stats)); // Last entry in stats array is latest campaign stats.

        this.listenerStatsLastTen$ = this.store.select(fromRoot.getListenerStats)
            .map(stats => stats.slice(-10));

        this.pollStats$ = this.store.select(fromRoot.getPollsState);
    }

    ngOnInit() {
        /**
         * This initializes the conference.
         * Get's conference setup and on a success will start event polling
         */
        this.store.dispatch(new ConfGetSetupStart());
    }

    ngOnDestroy() {
        /**
         * This will exit the conference, clear out the conf state tree
         * and dispatch a polling end action
         */
        this.store.dispatch(new ConfExit());
    }

    toggleVisibility(event){
        this.liveview = event.target.checked;
    }
}
