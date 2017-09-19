import {Component} from '@angular/core';

@Component({
    selector: 'app-moderator-layout',
    template: `
    <div fxLayout="row" fxFlex="56%">
      <div fxLayout="column" fxFlex="450px">
        <div fxFlex="0 0 auto" class="bordered"><ng-content select="[basicControl]"></ng-content></div>
        <div fxFlex class="bordered"><ng-content select="[chat]"></ng-content></div>
      </div>
      <div fxLayout="column" fxFlex>
        <div fxFlex class="bordered"><ng-content select="[questions]"></ng-content></div>
      </div>
    </div>
    <div fxLayout="row" fxFlex="44%">
      <div fxFlex class="bordered"><ng-content select="[tabs]"></ng-content></div>
      <div fxFlex="550px" class="bordered"><ng-content select="[participants]"></ng-content></div>
    </div>
    <app-footer-layout></app-footer-layout>
    `,
    styles:[`
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .bordered {
      border: 1px solid #DDD;
    }
    `],
})
export class ModeratorLayoutComponent {}

