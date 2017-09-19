import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

import {AuthService} from '../../services/auth';
import {AlertModal} from '../modals/alert';

/**
 * Create separate methods for login with pin and login with user/pass.
 * Cleanup ngOnInit
 * Change route to use queryparams instead of route for "next"
 */

@Component({
    selector: 'app-login',
    templateUrl: './loginComponent.tmpl.html',
    styles: [`
    :host {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    `]
})
export class LoginComponent implements OnInit {

    constructor(private router: Router,
                private authService: AuthService,
                private modal: NgbModal,
                private activatedRoute: ActivatedRoute) {
    }

    private showUsernamePassword: boolean = true;
    private board: string=null;

    ngOnInit() {
        console.log('Opening login');
        this.activatedRoute
            .params
            .subscribe((param:any) => {

                if(param && param.board) {
                    this.board = param.board.toLowerCase();

                    switch(this.board){
                        case 'control':
                        case 'listen':
                            this.showUsernamePassword=false;
                            break;
                        case 'setup':
                        case 'report':    
                        default:
                            this.showUsernamePassword=true;
                            break;
                    }
                }
            });
    }

    openModal(title: string, message: string) {
        const modalRef = this.modal.open(AlertModal);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
    }

    ngAfterViewInit() {
        this.activatedRoute.queryParams.subscribe(
            (data: any) => {
                if (data && 'event' in data && data.event === 'session') {
                    this.openModal('Session Event', 'Disconnected due to session timeout');
                }
            }
        );

        let flash_msg = sessionStorage.getItem('flash_msg');
        if (flash_msg) {
            this.openModal('Error', flash_msg);
            sessionStorage.removeItem('flash_msg');
                
        }
    }


    togglePin() {
        this.showUsernamePassword = !this.showUsernamePassword;
        console.log("toggling pin: ", this.showUsernamePassword);
    }

    login(event: Event,
          username: string,
          password: string,
          pin: string): void {
        event.preventDefault();

        this.authService.login(username, password, pin)
            .then(response => {
                if(this.board === 'control'){
                    this.router.navigateByUrl('/control');
                }
                else {
                    this.router.navigateByUrl('/admin/calendar');
                }
            }).catch(msg => this.openModal('Error Logging In', msg));
    }

}
