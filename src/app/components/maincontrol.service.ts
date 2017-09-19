import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import {ReplaySubject} from 'rxjs/Rx';

import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AuthService} from '../services/auth';
import {RequestHelperService} from '../services/request-helper';
import {ConfigService} from '../services/config';


@Injectable()
export class MainControlService {
    private apiUrl: string = this.config.baseUrl + '/api_telapp_conference/rest/json';
    private appSig: string = this.config.appSig;

    private progress$: Observable<number>;
    private progress: number = 0;
    private progressObserver: any;
    private xhrObserver$: Observable<string>;
    private xhrObserver: any;

    private queryPageSize: number = 500;

    constructor(
        private authService: AuthService,
        private requestHelper: RequestHelperService,
        private config: ConfigService,
    ) {
        this.progress$ = new Observable(observer => this.progressObserver = observer);
        this.xhrObserver$ = new Observable(observer => this.xhrObserver = observer);
    }

    //Get the pin of the active user
    public getMyPin(): Promise<Response> {
        let sessionId = this.authService.sessionId;
        return this.requestHelper.requestGet(`${this.apiUrl}/getMyPin?sid=${sessionId}&appSig=${this.appSig}`);
    }

    //Get current conference event
    public getCurrentConference(): Promise<Response> {
        let sessionId = this.authService.sessionId;
        return this.requestHelper.requestGet(`${this.apiUrl}/currentConference?sid=${sessionId}&appSig=${this.appSig}&lite=true`);
    }

    //Get current conference data
    public loadConference(hostScheduleId: number): Promise<any> {
        let sessionId = this.authService.sessionId;
        return this.requestHelper.requestGet(`${this.apiUrl}/conferenceEdit/${hostScheduleId}?appSig=${this.appSig}&sid=${this.authService.sessionId}`);
    }
}
