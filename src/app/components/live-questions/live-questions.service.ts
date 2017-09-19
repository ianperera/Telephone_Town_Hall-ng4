/**
 * TO FIX:
 * Use store or endpoints sservice to crud questions.
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AuthService} from '../../services/auth';
import {RequestHelperService} from '../../services/request-helper';
import {ConfigService} from '../../services/config';

@Injectable()
export class LiveQuestionService {
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
        this.progress$ = new Observable(observer => {
            this.progressObserver = observer
        });

        this.xhrObserver$ = new Observable(observer => {
            this.xhrObserver = observer
        });
    }

    public lookUpQuestion(questionId: number): Promise<Response> {
        let sessionId = this.authService.sessionId;
        return this.requestHelper.requestGet(`${this.apiUrl}/question/${questionId}?&appSig=${this.appSig}&sid=${sessionId}`);
    }

    public doneQuestion(questionId: number): Promise<Response> {
        let sessionId = this.authService.sessionId;
        return this.requestHelper.requestDelete(`${this.apiUrl}/question/${questionId}?&appSig=${this.appSig}&sid=${sessionId}&action=1`);
    }

    public editQuestion(questionData: any): Promise<Response> {
        let sessionId = this.authService.sessionId;
        return this.requestHelper.requestDelete(`${this.apiUrl}/question/?sid=${sessionId}&appSig=${this.appSig}&${questionData}`);
    }
}
