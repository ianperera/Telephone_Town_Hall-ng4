import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Ngrx Modules
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ChatEffects } from './store/chat/chat.effects';
import { ConferenceEffects } from './store/conference/conference.effects';
import { EventsEffects } from './store/events/events.effects';
import { ParticipantEffects } from './store/participants/participants.effects';
import { PollsEffects } from './store/polls/polls.effects';
import { QuestionEffects } from "./store/questions/questions.effects";
import { reducers } from './store';

import {ModalModule} from 'angular2-modal';  // Looks like this needs to be forRoot'd

// Routing Module
import {AppRoutingModule} from './app-routing.module';

// Services
import {AuthService} from './services/auth';
import {RequestHelperService} from './services/request-helper';
import {SessionValidationService} from './services/sessionValidation';
import {EventService} from './shared/event-streamer/events.service';
import {ConfigService} from './services/config';
import {EndpointsService} from './services/endpoints';
import {RoleService} from './services/role';

// Setup Components
import {AppComponent} from './app.component';
import {HomePage} from './containers/home-page';
import {LoginPage} from './containers/login-page';
import {ModeratorPage} from './containers/moderator-page';


//Control Components
import {ComponentsModule} from './components/';

//Control Services (These should )
import {BasicControlService} from "./components/basic-control/basic-control.service";
import {ChatService} from "./components/chat/chat.service";
import {AudioService as ControlAudioService} from "./components/audio/audio.service";
import {PollingService} from "./components/polling/polling.service";
import {CallListenerService} from "./components/call-listener/call-listener.service";
import {CallParticipantService} from "./components/call-participant/call-participant.service";
import {QueryService} from "./components/query/query.service";
import {CallProgessService} from "./components/call-progress/call-progress.service";
import {LiveQuestionService} from "./components/live-questions/live-questions.service";

// Component of Listener
import {ListenComponent} from './components/listen/listen.component';

// Component of Report
import {MainControlService} from './components/maincontrol.service';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        // Modal
        ModalModule.forRoot(),
        // Redux Store
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({ maxAge: 50 }),
        EffectsModule.forRoot([
            ChatEffects,
            ConferenceEffects,
            EventsEffects,
            ParticipantEffects,
            PollsEffects,
            QuestionEffects,
        ]),
        NgbModule.forRoot(),
        ComponentsModule,
    ],
    declarations: [
        AppComponent,
        ListenComponent, // Move to ./containers
        HomePage,
        LoginPage,
        ModeratorPage,
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthService,
        RequestHelperService,
        SessionValidationService,
        EventService,
        MainControlService,
        ChatService,
        ControlAudioService,
        BasicControlService,
        PollingService,
        CallListenerService,
        CallParticipantService,
        ConfigService,
        EndpointsService,
        QueryService,
        CallProgessService,
        LiveQuestionService,
        RoleService,
    ]
})
export class AppModule {
}
