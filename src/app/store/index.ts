import { orderBy, values, filter } from 'lodash';
import { createSelector } from 'reselect';
import { ActionReducerMap } from '@ngrx/store';

import * as fromUi from './ui/ui.reducers';
import * as fromEvents from './events/events.reducers';
import * as fromParticipants from './participants/participants.reducers';
import * as fromChat from './chat/chat.reducers';
import * as fromConference from './conference/conference.reducers';
import * as fromCampaign from './campaign/campaign.reducers';
import * as fromListeners from './listeners/listeners.reducers';
import * as fromPolls from './polls/polls.reducers';
import * as fromQuestions from './questions/questions.reducers';

export interface State {
  ui: fromUi.State;
  events: fromEvents.State;
  participants: fromParticipants.State;
  chat: fromChat.State;
  conference: fromConference.State;
  campaign: fromCampaign.State;
  listeners: fromListeners.State;
  polls: fromPolls.State;
  questions: fromQuestions.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.reducer,
  events: fromEvents.reducer,
  participants: fromParticipants.reducer,
  chat: fromChat.reducer,
  conference: fromConference.reducer,
  campaign: fromCampaign.reducer,
  listeners: fromListeners.reducer,
  polls: fromPolls.reducer,
  questions: fromQuestions.reducer,
};

export const getUIState = (state: State) => state.ui;
export const getParticipantState = (state: State) => state.participants;
export const getChatState = (state: State) => state.chat;
export const getConfState = (state: State) => state.conference;
export const getCampaignState = (state: State) => state.campaign;
export const getListenersState = (state: State) => state.listeners;
export const getPollsState = (state: State) => state.polls;
export const getQuestionState = (state: State) => state.questions;


// Participants Selectors
export const getParticipantArray = createSelector(
  getParticipantState,
  fromParticipants.sortFactory()
);
export const getSelectedParticipant = createSelector(
  getUIState,
  getParticipantState,
  (ui, partcipants) => !!ui.selectedParticipant ? partcipants[ui.selectedParticipant] : undefined
);

// Chat Selectors
export const getChatAlerts = createSelector(
  getChatState,
  (state: fromChat.State) => state.alerts
);
// This is an inappropriate use of createSelector..
// Chat count should be pulled into the store.
export function getLatestChat(count: number = 20) {
  return createSelector(getChatState, fromChat.getLatestChat(count));
}

// Conference Selectors
export const getConfSetup = createSelector(getConfState, fromConference.getSetup);
export const getConfStatus = createSelector(getConfState, fromConference.getStatus);
export const getConfPending = createSelector(getConfState, fromConference.getPending);
export const getConfInitialized = createSelector(getConfState, fromConference.getInitialized);

// Campaign Selectors
export const getMinutesLeft = createSelector(getCampaignState, fromCampaign.getMinutesLeft);
export const getCampaignStats = createSelector(getCampaignState, fromCampaign.getStats);
export const getLatestCampaignStats = createSelector(getCampaignState, fromCampaign.getLatestStats);

// Listener Selectors
export const getListenerStats = createSelector(getListenersState, fromListeners.getStats);

// Polls Selectors
export const getPollsStats = createSelector(getPollsState, fromPolls.getStats);
export const getLatestPollStats = createSelector(getPollsState, fromPolls.getLatestPollStats);
export function getPollStatsById(id: number) {
  return createSelector(getPollsState, fromPolls.getPollStatsById(id))
}

// Question (Live) Selectors
export const getQuestions = createSelector(getQuestionState, fromQuestions.filterFactory((val) => {
  return val.status === 16;}));
export const getSelectedQuestion = createSelector(
    getUIState,
    getQuestionState,
    (ui, questions) => !!ui.selectedQuestion ? questions[ui.selectedQuestion] : undefined
);

// On Deck Question Selectors
export const getOnDeckQuestionUpdate = createSelector(
    getUIState,
    getQuestionState,
    (ui, questions) => orderBy(
        filter(values(questions), (val) => {
          return val.status === 8;
        }),
        'rating', ui.onDeckQuestionOrder
    )
);
export const getOnDeckSelectedQuestion = createSelector(
    getUIState,
    getQuestionState,
    (ui, questions) => questions[ui.selectedOnDeckQuestion]
);
export const getOnDeckQuestionOrder = createSelector(
    getUIState,
    (ui) => ui.onDeckQuestionOrder
);

// Screened Question Selectors
export const getScreenedQuestionUpdate = createSelector(
    getUIState,
    getQuestionState,
    (ui, questions) => orderBy(
        filter(values(questions), (val) => {
          return val.status === 4;
        }),
        'rating', ui.screenedQuestionOrder
    )
);
export const getScreenedSelectedQuestion = createSelector(
    getUIState,
    getQuestionState,
    (ui, questions) => questions[ui.selectedScreenedQuestion]
);
export const getScreenedQuestionOrder = createSelector(
    getUIState,
    (ui) => ui.screenedQuestionOrder
);

// RaisedHand Question Selectors
export const getRaisedHandQuestionUpdate = createSelector(
    getQuestionState,
    fromQuestions.filterFactory((val) => {
        return val.status === 1 || val.status === 2;
    })
);
export const getRaisedHandSelectedQuestion = createSelector(
    getUIState,
    getQuestionState,
    (ui, questions) => questions[ui.selectedRaisedHandQuestion]
);

export const getBannedQuestions = createSelector(getQuestionState, fromQuestions.getBannedQuestions);
export const getDncQuestions = createSelector(getQuestionState, fromQuestions.getDncQuestions);
export const getDoneQuestions = createSelector(getQuestionState, fromQuestions.getDoneQuestions);
export const getHandRaisedQuestions = createSelector(getQuestionState, fromQuestions.getHandRaisedQuestions);
export const getLiveQuestions = createSelector(getQuestionState, fromQuestions.getLiveQuestions);
export const getOnDeckQuestions = createSelector(getQuestionState, fromQuestions.getOnDeckQuestions);
export const getScreenedQuestions = createSelector(getQuestionState, fromQuestions.getScreenedQuestions);
export const getScreenerLeftQuestions = createSelector(getQuestionState, fromQuestions.getScreenerLeftQuestions);
export const getScreeningQuestions = createSelector(getQuestionState, fromQuestions.getScreeningQuestions);
