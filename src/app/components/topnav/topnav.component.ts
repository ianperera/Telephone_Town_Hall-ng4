import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth';

/**
 * This component needs some attention.
 */

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.tmpl.html',
    styles:[`
    :host {
        flex: 0 0 auto;
    }
    `]
})
export class TopnavComponent implements OnInit {

    authUser: any = null;
    showTopLinks: boolean;
    isSetupActive: boolean = false;
    isControlActive: boolean = false;
    isListenActive: boolean = false;
    isReportActive: boolean = false;

    constructor(private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        if (this.authService.sessionId) {
            this.authService.validateSession()
                .then(() => {
                    this.authService.getAuthUser()
                        .then(response => {
                            this.authUser = response
                        });
                })
                .catch(() => {
                    this.authService.logout()
                        .then(() => {
                            this.authUser = null;
                            this.router.navigateByUrl('/login');
                        });
                });
        }

        this.showTopLinks = true;
        this.setNavbarActive();
    }

    setNavbarActive() {
        this.isSetupActive = false;
        this.isControlActive = false;
        this.isListenActive = false;
        this.isReportActive = false;

        if (this.router.url.indexOf('/admin') > -1) {
            this.isSetupActive = true;
        }
        else if (this.router.url.indexOf('/control') > -1) {
            this.isControlActive = true;
        }
        else if (this.router.url.indexOf('/listen') > -1) {
            this.isListenActive = true;
        }
        else if (this.router.url.indexOf('/report') > -1) {
            this.isReportActive = true;
        }
    }

    navigate(module): void{
        switch (module) {
            case 'setup':
                this.router.navigateByUrl('/admin/calendar');
                break;
            case 'control':
                this.router.navigateByUrl('/control');
                break;
            case 'listen':
                this.router.navigateByUrl('/listen');
                break;
            case 'report':
                this.router.navigateByUrl('/report');
                break;
            default:
                this.router.navigateByUrl('/home');
        }
    }

    logout(event: Event): void {
        event.preventDefault();

        this.authService.logout()
            .then(() => {
                this.authUser = null;
                var module = null;
                if (this.isSetupActive) {
                    module = 'setup';
                }
                if (this.isControlActive) {
                    module = 'control';
                }
                if (this.isListenActive) {
                    module = 'listen';
                }
                if (this.isReportActive) {
                    module = 'report';
                }
                this.router.navigateByUrl('/login/' + module);
            });
    }

}
