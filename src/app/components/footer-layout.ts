import {Component, OnInit} from '@angular/core';
import { AuthService } from "../services/auth" ;
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-footer-layout',
    template: ` 
       <div style="margin-top: 20px; font-size: 10px;">
        <nav class="navbar navbar-inverse navbar-fixed-bottom" role="navigation">
            <span class="navbar-left navbar-text hidden-sm hidden-xs small" style="font-size: 10px">
                <span class="text-muted credit">Username: {{authData.user.lastName}}</span>
                <span class="text-muted credit hideOnSmall">Customer: {{authData.customer.name}}</span>
                <span class="text-muted credit hideOnMedium">Coordinator: </span>
            </span>
            <span class="navbar-right hidden-sm hidden-xs small" style="font-size: 10px;margin-right: 20px; margin-top: 10px;">
                <button type="button" class="btn btn-link navbar-btn" style="margin: 0 0 0 0;font-size: 10px;"
                        (click)="openping(pinghistory)">Link OK</button>
                <button type="button" class="btn btn-link navbar-btn" style="margin: 0 0 0 0; font-size: 10px;"
                        (click)="opensite(siteid)">Site: {{authData.siteId}}</button>
                <!--Embed the version from the package.json-->
                <span class="text-muted credit hideOnMedium">v 0.0.0</span>
            </span>

        </nav>
    </div>

<!--Ping History Modal-->
<ng-template #pinghistory let-c="close" let-d="dismiss">
  <div class="modal-header">
    <h4 class="modal-title">Ping History</h4>
    <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <h4 class="modal-title">Ping History</h4>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="c('Close click')">Close</button>
  </div>
</ng-template>


<!--Site Info-->
<ng-template #siteid let-c="close" let-d="dismiss">
  <div class="modal-header">
    <h4 class="modal-title">Site info</h4>
    <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Site info</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="c('Close click')">Close</button>
  </div>
</ng-template>

    `,
    styles: [`
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    `],
})
export class FooterLayoutComponent implements OnInit {
    public authData;
    closeResultping: string;
    closeResultsite: string;

    constructor(private authService: AuthService,
                private modalService: NgbModal) {

        this.authData = this.authService.getAuthData();
    }

    ngOnInit() {
    }

    openping(pinghistory) {
        this.modalService.open(pinghistory).result.then((result) => {
            this.closeResultping = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResultping = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    opensite(siteid) {
        this.modalService.open(siteid).result.then((result) => {
            this.closeResultsite = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResultsite = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
}

