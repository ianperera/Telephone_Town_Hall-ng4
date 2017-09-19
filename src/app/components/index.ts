import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TextMaskModule} from 'angular2-text-mask';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {TooltipModule} from "ngx-tooltip";

import {ChartsModule} from 'ng2-charts';

import {BasicControlComponent} from "./basic-control/basic-control.component";
import {ChatComponent} from "./chat/chat.component";
import {AudioComponent} from "./audio/audio.component";
import {PollingComponent} from "./polling/polling.component";
import {ListenersComponent} from "./listeners/listeners.component";
import {CallListenerComponent} from "./call-listener/call-listener.component";
import {CallParticipantComponent} from "./call-participant/call-participant.component";
import {QueryComponent} from "./query/query.component";
import {CallProgressComponent} from "./call-progress/call-progress.component";
import {ParticipantsComponent} from './participants/participants.component';
import {ParticipantsPanelComponent} from './participants/participants.panel';
import {ParticipantsItemComponent} from './participants/participants.item';
import {ParticipantsEditComponent} from './participants/participants.edit';

import {NgbdModalComponent, NgbdModalContent} from './live-questions/modal-component';
import {LiveQuestionsComponent} from './live-questions/live-questions.component';
import {LiveTableQuestionsComponent} from './live-questions/live-questions-table.component';
import {LiveQuestionEditComponent} from "./live-questions/live-questions-edit.component";
import {LiveQuestionEditModal} from "./live-questions/live-questions-edit.modal";

import {OnDeckComponent} from './ondeck/ondeck.component';
import {OnDeckEditComponent} from './ondeck/ondeck-edit.component';
import {OnDeckModalComponent, OnDeckModalContent} from './ondeck/ondeck.modal';

import {RaisedHandComponent} from './raisedhand/raisedhand.component';
import {RaisedHandEditComponent} from './raisedhand/raisedhand-edit.component';
import {RaisedHandModalComponent, RaisedHandModalContent} from './raisedhand/raisedhand.modal';

import {ScreenedComponent} from './screened/screened.component';
import {ScreenedEditComponent} from './screened/screened-edit.component';
import {ScreenedModalComponent, ScreenedModalContent} from './screened/screened.modal';

import {TopnavComponent} from './topnav/topnav.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home';
import {ModeratorLayoutComponent} from './moderator-layout';
import {QuestionsLayoutComponent} from './questions-layout';
import {FooterLayoutComponent} from  './footer-layout';

import {AlertModal} from './modals/alert';

const COMPONENTS = [
  BasicControlComponent,
  ChatComponent,
  AudioComponent,
  PollingComponent,
  ListenersComponent,
  CallListenerComponent,
  CallParticipantComponent,
  QueryComponent,
  CallProgressComponent,
  ParticipantsComponent,
  ParticipantsPanelComponent,
  ParticipantsItemComponent,
  ParticipantsEditComponent,
  LiveQuestionsComponent,
  LiveTableQuestionsComponent,
  LiveQuestionEditComponent,
  LiveQuestionEditModal,
  OnDeckComponent,
  OnDeckEditComponent,
  RaisedHandComponent,
  RaisedHandEditComponent,
  ScreenedComponent,
  ScreenedEditComponent,
  TopnavComponent,
  LoginComponent,
  HomeComponent,
  ModeratorLayoutComponent,
  QuestionsLayoutComponent,
  FooterLayoutComponent,
  AlertModal,
  NgbdModalComponent, NgbdModalContent,
  OnDeckModalComponent, OnDeckModalContent,
  ScreenedModalComponent, ScreenedModalContent,
  RaisedHandModalComponent, RaisedHandModalContent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    ChartsModule,
    TextMaskModule,
    NgxPaginationModule,
    TooltipModule,
    FlexLayoutModule,
    BootstrapModalModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: [
    AlertModal,
    NgbdModalContent,
    RaisedHandModalContent,
    OnDeckModalContent,
    ScreenedModalContent,
  ]
})
export class ComponentsModule { }