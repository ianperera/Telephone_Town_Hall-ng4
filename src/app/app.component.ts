import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`,
    styles: [`
    :host {
        display: flex;
        width: 100%;
        height: 100%;
    }
    `]
})
export class AppComponent {
    constructor(private authService: AuthService) {
        if (this.authService.sessionId) {
            this.authService.startSessionExpireTimer(this.authService.sessionId);
        }
    }
}
