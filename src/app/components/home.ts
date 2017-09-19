import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    template: `
    <div class="container">
      <div class="jumbotron" align="center">
          <h1>Welcome to the<br>Conference Dashboard</h1>
          <p>From here you can manage, setup, listen to, and view reports for your conferences</p>
          <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="20px">
              <a class="btn btn-large btn-primary" routerLink="/setup">
                  <span class="glyphicon glyphicon-edit"></span><br>
                  Setup
              </a>
              <a class="btn btn-large btn-primary" routerLink="/control">
                  <span class="glyphicon glyphicon-dashboard"></span><br>
                  Control
              </a>
              <a class="btn btn-large btn-primary" routerLink="/listen">
                  <span class="glyphicon glyphicon-headphones"></span><br>
                  Listen
              </a>
              <a class="btn btn-large btn-primary" routerLink="/report">
                  <span class="glyphicon glyphicon-export"></span><br>
                  Report
              </a>
          </div>
      </div>
    </div>
    `,
    styles:[`
    :host {
      padding-top: 50px;
    }
    `],
})
export class HomeComponent {}

