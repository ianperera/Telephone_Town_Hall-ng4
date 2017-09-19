import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import {ReplaySubject} from 'rxjs/Rx';

import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AuthService} from '../../services/auth';
import {RequestHelperService} from '../../services/request-helper';
import {ConfigService} from '../../services/config';
import {ControlListener, querySearch} from "../control.datatypes";

@Injectable()
export class QueryService {
    private apiUrl: string = this.config.baseUrl + '/api_telapp_conference/rest/json';
    private appSig: string = this.config.appSig;

    private progress$: Observable<number>;
    private progress: number = 0;
    private progressObserver: any;
    private xhrObserver$: Observable<string>;
    private xhrObserver: any;

    public queryPageSize: number = 10;

    constructor(
        private authService: AuthService,
        private requestHelper: RequestHelperService,
        private config: ConfigService,
    ) {
        this.progress$ = new Observable(observer => this.progressObserver = observer);
        this.xhrObserver$ = new Observable(observer => this.xhrObserver = observer);
    }

    //Conference Listener Lookup
    public listenerLookupForm(querySearch: querySearch, page:number): Promise<Response> {
        let sessionId = this.authService.sessionId;
        let queryParams = JSON.stringify(querySearch);
        return this.requestHelper.requestGet(`${this.apiUrl}/listenerLookupForm?&appSig=${this.appSig}&sid=${sessionId}&queryParam=${queryParams}&queryPageSize=${this.queryPageSize}&queryPage=${page}`);
    }

    //Bring a listener live
    public bringListenertoLive(data: ControlListener): Promise<Response> {
        let sessionId = this.authService.sessionId;
        let listenerData = JSON.stringify(data);
        return this.requestHelper.requestPost(`${this.apiUrl}/controlListener?sid=${sessionId}&appSig=${this.appSig}&listener=${listenerData}`, listenerData);
    }

    //Raise listener's hand
    public raisedHand(data: ControlListener): Promise<Response> {
        let sessionId = this.authService.sessionId;
        let listenerData = JSON.stringify(data);
        return this.requestHelper.requestGet(`${this.apiUrl}/controlListener?sid=${sessionId}&appSig=${this.appSig}&listener=${listenerData}`);
    }

}