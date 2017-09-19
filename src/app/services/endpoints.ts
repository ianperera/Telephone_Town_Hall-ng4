import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { reduce, toPairs } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/do';

import { AuthService } from './auth';
import { ConfigService } from './config';
import { Participant } from '../store/participants/participants.reducers';
import { ParticipantData, StreamEvents, genRequest, QuestionData } from '../models/events';
import { ConversationMessage } from '../models/chat';
import { ConfControlAction, ConferenceSetup } from '../models/conference';
import { ReqPollParams, Poll, PollStats, PollStatsResponse, genPoll } from '../models/polls';

/**
 * This service speaks telapp. It'll probably get huge and gross and I'll have
 * to break it up into smaller bits as I need more telapp integration.
 */

@Injectable()
export class EndpointsService {
  constructor(
    private http: Http,
    private auth: AuthService,
    private config: ConfigService
  ) {}

  /**
   * A wonky build url function.
   * @param url Base url
   * @param endpoint Api endpoint string
   * @param resourceId Optional: resourceId to build into url
   * @param params Optional: A flat object literal to turn into query params
   */
  private buildUrl(url: string, endpoint: string, resourceId?: number, params?: {[index: string]: any}): string {
    const arr = [url, endpoint];
    !!resourceId && arr.push('' + resourceId);
    !!params && arr.push(reduce(toPairs(params), (a, p) => a + `${p[0]}=${p[1]}&`, '?'));
    return arr.join('/');
  }

  /**
   * Make an http request and return an observable of StreamEvents[]
   * @param conferenceId Actually streamId fron getConference
   */
  pollEvents(conferenceId: string, sync = false): Observable<StreamEvents[]> {
      const request = genRequest({sessionId: this.auth.sessionId, sync}, {conferenceId});
      const params = {request: JSON.stringify(request), batchData: 'true'};
      const url = this.buildUrl(this.config.baseUrl, 'api_telapp_ns/eventStreamServlet/json', undefined, params);
      return this.http.get(url).map(res => res.json() as StreamEvents[]);
  }

  /**
   * Participant Http Calls
   */
  private genParticipantGet(id: number, endpoint: string, parameters?: {[index: string]: any}): Observable<ParticipantData> {
    const params = {appSig: this.config.appSig, sid: this.auth.sessionId, ...parameters};
    const url = this.buildUrl(this.config.baseUrl, endpoint, id, params);
    return this.http.get(url).timeout(this.config.http.timeout).map(r => r.json().data as ParticipantData)
  }

  participantHold(id: number): Observable<ParticipantData> {
    return this.genParticipantGet(id, 'api_telapp_conference/rest/json/participantHold');
  }
  participantUnhold(id: number): Observable<ParticipantData> {
    return this.genParticipantGet(id, 'api_telapp_conference/rest/json/participantUnhold');
  }
  participantMute(id: number): Observable<ParticipantData> {
    return this.genParticipantGet(id, 'api_telapp_conference/rest/json/participantMute');
  }
  participantUnmute(id: number): Observable<ParticipantData> {
    return this.genParticipantGet(id, 'api_telapp_conference/rest/json/participantUnmute');
  }
  participantHangup(id: number): Observable<ParticipantData> {
    return this.genParticipantGet(id, 'api_telapp_conference/rest/json/participantHangup');
  }
  participantSolo(id: number): Observable<ParticipantData> {
    return this.genParticipantGet(id, 'api_telapp_conference/rest/json/participantSolo');
  }
  participantSetVolume(id: number, volume: number): Observable<ParticipantData> {
    return this.genParticipantGet(id, 'api_telapp_conference/rest/json/participantVolume', {volume});
  }
  participantRename(participant: Participant): Observable<ParticipantData> {
    const url = this.buildUrl(this.config.baseUrl, 'api_telapp_conference/rest/json/participantEdit', participant.id)
    const body = {appSig: this.config.appSig, sid: this.auth.sessionId, participant};
    return this.http.post(url, body).timeout(this.config.http.timeout).map(r => r.json().data as ParticipantData);
  }

  /**
   * Question Http Calls
   */
  private genQuestionGet(id: number, endpoint: string, parameters?: {[index: string]: any}): Observable<QuestionData> {
    const params = {appSig: this.config.appSig, sid: this.auth.sessionId, ...parameters};
    const url = this.buildUrl(this.config.baseUrl, endpoint, id, params);
    return this.http.get(url).timeout(this.config.http.timeout).map(r => r.json().data as QuestionData)
  }
  //Edit Questions
  questionEdit(question: QuestionData): Observable<QuestionData> {
    const url = this.buildUrl(this.config.baseUrl, 'api_telapp_conference/rest/json/question', question.id)
    const body = {appSig: this.config.appSig, sid: this.auth.sessionId, question: question};
    return this.http.put(url, body).timeout(this.config.http.timeout).map(r => r.json().data as QuestionData);
  }

  //button question controls
  questionOndeck(id: number): Observable<QuestionData> {
    return this.genQuestionGet(id, 'api_telapp_conference/rest/json/bringQuestionOnDeck');
  }
  questionRescreen(id: number): Observable<QuestionData> {
    return this.genQuestionGet(id, 'api_telapp_conference/rest/json/requestRescreenQuestion');
  }
  questionLive(id: number): Observable<QuestionData> {
    return this.genQuestionGet(id, 'api_telapp_conference/rest/json/takeQuestionLive');
  }
  questionRemove(id: number): Observable<QuestionData> {
    return this.genQuestionGet(id, 'api_telapp_conference/rest/json/doneLiveQuestion');
  }
  //Others
  questionDone(id: number): Observable<QuestionData> {
    return this.genQuestionGet(id, 'api_telapp_conference/rest/json/doneLiveQuestion');
  }
  questionKick(id: number): Observable<QuestionData> {
    return this.genQuestionGet(id, 'api_telapp_conference/rest/json/kickLiveQuestion');
  }
  questionDnc(id: number): Observable<QuestionData> {
    return this.genQuestionGet(id, 'api_telapp_conference/rest/json/kickLiveQuestion', {dnc: true});
  }
  questionReject(id: number): Observable<QuestionData> {
    return this.genQuestionGet(id, 'api_telapp_conference/rest/json/rejectQuestion');
  }
  questionBan(id: number): Observable<QuestionData> { // Should get it's own GET method soon.
    const params = {appSig: this.config.appSig, sid: this.auth.sessionId, action: 3};
    const url = this.buildUrl(this.config.baseUrl, 'api_telapp_conference/rest/json/question', id, params);
    return this.http.delete(url).map(r => r.json().data as QuestionData);
  }


  /**
   * Screener Http Calls
   */

  /**
   * Chat Http Calls
   */
  chatSend(message: ConversationMessage): Observable<boolean> {
    const url = this.buildUrl(this.config.baseUrl, 'api_telapp_conference/rest/json/sendChat');
    const body = {appSig: this.config.appSig, sid: this.auth.sessionId, message};
    return this.http.post(url, body).timeout(this.config.http.timeout).map(() => true);
  }

  getNickname(): Observable<string> {
    const url = this.buildUrl(this.config.baseUrl, 'api_telapp_conference/rest/json/sendChat');
    return this.http.get(url).map(res => res.json().data as string);
  }

  /**
   * Conference Http Calls
   */
  confControl(action: ConfControlAction): Observable<boolean> {
    const url = this.buildUrl(this.config.baseUrl, 'api_telapp_conference/rest/json/controlConference');
    const body = {appSig: this.config.appSig, sid: this.auth.sessionId, action};
    return this.http.post(url, body).timeout(this.config.http.timeout).map(() => true);
  }

  getConfSetup(): Observable<ConferenceSetup> {
    const params = {appSig: this.config.appSig, sid: this.auth.sessionId, lite: false};
    const url = this.buildUrl(this.config.baseUrl, 'api_telapp_conference/rest/json/currentConference', undefined, params);
    return this.http.get(url).map(res => res.json().data as ConferenceSetup); // No Timeout, this is a long running call
  }

  /**
   * Polling Http Calls
   */
  getPollStats(): Observable<PollStatsResponse> {
    const params = {appSig: this.config.appSig, sid: this.auth.sessionId};
    const url = this.buildUrl(this.config.baseUrl, 'api_telapp_conference/rest/json/livePolls', undefined, params);
    return this.http.get(url).map(res => res.json().data as PollStatsResponse);
  }

  // This guy has some kludge in buildUrl due to a delay not being a query param
  openPoll({pollId, delay = 0}: {pollId: number, delay: number}): Observable<PollStats> {
    const params = {appSig: this.config.appSig, sid: this.auth.sessionId};
    const url = this.buildUrl(this.config.baseUrl, `api_telapp_conference/rest/json/livePoll/${pollId}`, delay, params);
    return this.http.post(url, '').map(res => res.json().data as PollStats);
  }

  closePoll(): Observable<PollStats> {
    const params = {appSig: this.config.appSig, sid: this.auth.sessionId};
    const url = this.buildUrl(this.config.baseUrl, 'api_telapp_conference/rest/json/livePoll', undefined, params);
    return this.http.delete(url).map(res => res.json().data as PollStats);
  }

  // If poll.id is not specified or is set to -1 a new poll is created, otherwise existing poll updated
  savePoll(poll: ReqPollParams, conferenceId: number = -1): Observable<Poll> {
    const url = this.buildUrl(this.config.baseUrl, 'api_telapp_conference/rest/json/poll', conferenceId);
    const body = {appSig: this.config.appSig, sid: this.auth.sessionId, poll: genPoll(poll)};
    return this.http.post(url, body).map(res => res.json().data as Poll);
  }

  deletePoll(pollId: number): Observable<boolean> {
    const params = {appSig: this.config.appSig, sid: this.auth.sessionId};
    const url = this.buildUrl(this.config.baseUrl, 'api_telapp_conference/rest/json/poll', pollId, params);
    return this.http.delete(url).map(() => true);
  }
}
