import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router, CanActivate} from '@angular/router';
import {Subscription} from "rxjs";

import 'rxjs/add/operator/toPromise';

import {SessionValidationService} from "./sessionValidation";
import {RequestHelperService} from './request-helper';
import {ConfigService} from './config';

/**
 * References to window in this service will need to be removed or wrapped in
 * a factory function. Specifically, sessionId is problematic. Moving session
 * management into the store should solve this issue.
 */

@Injectable()
export class AuthService implements CanActivate {

    private apiUrl: string = this.config.baseUrl + '/api_telapp_sec/rest/json';
    private appSig: string = this.config.appSig;
    private isLoggedIn: boolean = false;
    private appName: string;
    private sessionEvents: Subscription;
    private cookieVal: string;

    constructor(
        private requestHelper: RequestHelperService,
        private router: Router,
        private sessionValidationService: SessionValidationService,
        private config: ConfigService
    ) {}

    get sessionId() {
        return sessionStorage.getItem('sessionId') || '';
    }

    isAuth(){
        return this.isLoggedIn;
    }

    set sessionId(value: string) {
        sessionStorage.setItem('sessionId', value);
    }

    login(username: string,
          password: string,
          pin?: string): Promise<Response> {
        let credentials = JSON.stringify({
            appName: this.appName,
            userName: username,
            password: password,
            pin: pin,
            clientTZOffset: 0
        });

        //Credentials object needs to be URL encoded
        credentials = encodeURIComponent(credentials);

        return this.requestHelper.requestGet(`${this.apiUrl}/loginEx/?appSig=${this.appSig}&credentials=${credentials}`)
            .then((response: any) => {
                sessionStorage.setItem('sessionId', response.data.id);
                sessionStorage.setItem('authData', JSON.stringify(response.data));
                this.isLoggedIn = true;
                this.startSessionExpireTimer(response.data.id);
                return response;
            });
    }

    logout(): Promise<Response> {
        return this.requestHelper.requestGet(`${this.apiUrl}/logout/?sid=${this.sessionId}&appSig=${this.appSig}`)
            .then((response: any) => {
                //debugger;
                sessionStorage.removeItem('sessionId');
                sessionStorage.removeItem('authData');
                this.isLoggedIn = false;
                this.clearSessionExpireTimer();
                this.cookieVal = this.getCookie("defaultDomainSID");
                if(this.cookieVal != "") {
                    this.deleteCookie("defaultDomainSID");
                }
                return response;
            });
    }

    validateSession(): Promise<Response> {
        return this.requestHelper.requestGet(`${this.apiUrl}/validateSession/?sid=${this.sessionId}&appSig=${this.appSig}`);
    }

    getSiteId(): Promise<Response> {
        return this.requestHelper.requestGet(`${this.apiUrl}/getSiteId/?sid=${this.sessionId}&appSig=${this.appSig}`);
    }

    getAuthUser(): Promise<Response> {
        return this.requestHelper.requestGet(`${this.apiUrl}/getAuthUser/?sid=${this.sessionId}&appSig=${this.appSig}`);
    }

    getAuthData() {
        return JSON.parse(sessionStorage.getItem('authData'));
    }

    startSessionExpireTimer(sessionId: string) {

        this.sessionValidationService.startSessionValidatorService(sessionId);
        if (this.sessionEvents) {
            this.sessionEvents.unsubscribe();
        }

        this.sessionEvents = this.sessionValidationService.sessionEvents.subscribe(
            data => {
                console.log("session is valid: ", data);
            },
            err => {
                console.error("error: ", err);
                //this.router.navigateByUrl('/login');
                this.sessionEvents.unsubscribe();
                this.router.navigateByUrl('/login?event=session');
            },
            () => console.log("done")
        );

        console.log("subscribed to session events");
    }

    getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = name + "=";
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s\+/g, "");
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return "";
    }

    deleteCookie(name: string) {
        this.setCookie(name, "", -1);
    }

    setCookie(name: string, value: string, expireDays: number, path: string = "") {
        let d:Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires:string = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
    }

    clearSessionExpireTimer() {
        if (this.sessionEvents) {
            console.log('clear session timer');
            this.sessionEvents.unsubscribe();
        }
    }

    canActivate() {
        if (window.sessionStorage.getItem('sessionId'))
            return true;

        console.log("User must login");
        this.router.navigate(['/login']);
        return false;
    }

}
