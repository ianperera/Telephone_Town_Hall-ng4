import { Component } from '@angular/core';

@Component({
    selector: 'app-home-page',
    template: `
    <app-topnav></app-topnav>
    <app-home></app-home>
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
export class HomePage {}
