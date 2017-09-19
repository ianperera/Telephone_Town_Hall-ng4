import {Component, OnInit} from '@angular/core';
import {QuestionData} from '../models/events';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store';

@Component({
    selector: 'app-questions-layout',
    template: ` 
        <ngb-accordion [closeOthers]="false" activeIds="question-1">
      <ngb-panel id="question-1" title="Live Questions ({{ (questionUpdate$ | async)?.length ? (questionUpdate$ | async)?.length : 0  }})">
        <ng-template ngbPanelContent>
          <app-livequestions *ngIf="liveview == true"></app-livequestions>
          <app-livequestions-table *ngIf="liveview == false"></app-livequestions-table>
        </ng-template>
      </ngb-panel>      
    </ngb-accordion>
    <ngb-accordion [closeOthers]="true" activeIds="static-1">      
      <ngb-panel id="static-1" title="On Deck Questions ({{ (ondeckQuestions$ | async)?.length ? (ondeckQuestions$ | async)?.length : 0  }})">        
        <ng-template ngbPanelContent>
          <app-ondeck></app-ondeck>
        </ng-template>
      </ngb-panel>
      <ngb-panel id="static-2" title="Screened Questions ({{ (screenedQuestions$ | async)?.length ? (screenedQuestions$ | async)?.length : 0  }})">
        <ng-template ngbPanelContent>
          <app-screened></app-screened>
        </ng-template>
      </ngb-panel>
      <ngb-panel id="static-3" title="Raised Hand ({{ (raisedHandQuestions$ | async)?.length ? (raisedHandQuestions$ | async)?.length : 0  }}) and Screening (0)">
        <ng-template ngbPanelContent>
          <app-raisedhand></app-raisedhand>
        </ng-template>
      </ngb-panel>
    </ngb-accordion> 
    <div class="checkbox" style="margin-left: 20px;"> 
        <label> 
        <input type="checkbox" checked (change)="toggleVisibility($event)">Split question view 
        </label> 
    </div>
    `,
    styles: [`
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    `],
})
export class QuestionsLayoutComponent implements OnInit {
    public liveview: boolean = true;
    public raisedHandQuestions$: Observable<QuestionData[]>;
    public screenedQuestions$: Observable<QuestionData[]>;
    public ondeckQuestions$: Observable<QuestionData[]>;
    public questionUpdate$: Observable<QuestionData[]>;

    ngOnInit() {
    }

    constructor( private store: Store<fromRoot.State>
    ) {

        this.raisedHandQuestions$ = this.store.select(fromRoot.getRaisedHandQuestionUpdate);
        this.screenedQuestions$ = this.store.select(fromRoot.getScreenedQuestionUpdate);
        this.ondeckQuestions$ = this.store.select(fromRoot.getOnDeckQuestionUpdate);
        this.questionUpdate$ = this.store.select(fromRoot.getQuestions);
    }

    toggleVisibility(event) {
        this.liveview = event.target.checked;
    }

}

