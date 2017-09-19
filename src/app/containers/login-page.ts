import { Component } from '@angular/core';

@Component({
    selector: 'app-login-page',
    template: `
    <app-topnav></app-topnav>
    <app-login></app-login>
    `,
    styles: [`
    :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    `]
})
export class LoginPage {}
