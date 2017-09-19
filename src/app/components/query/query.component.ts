import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ControlListener, querySearch} from "../control.datatypes";
import {QueryService} from "./query.service";
import {Modal} from "angular2-modal/plugins/bootstrap";
import {PaginationInstance} from 'ngx-pagination';

@Component({
    selector: 'app-query',
    templateUrl: './query.tmpl.html',
    styleUrls: ['./query.css']
})
export class QueryComponent implements OnInit {

    @ViewChild('filterListener') elQuestionName: ElementRef;

    timestamp: number | undefined;
    queries: any[];
    querySearch: querySearch = {
        filter: '',
        hasQuestion: false,
        hasPrevious: false,
        state: 0,
        callType: 0
    };
    selectedUser: ControlListener | undefined;
    selectedUserIndex: number | undefined;

    constructor(private queryService: QueryService,
                private modal: Modal) {
    }

    ngOnInit() {
    }

    selectUser(user: ControlListener, index: number) {
        this.selectedUser = user;
        this.selectedUserIndex = index;
    }

    pagination: PaginationInstance = {
        itemsPerPage: this.queryService.queryPageSize,
        totalItems: 0,
        currentPage: 1
    };


    clearSelectedUser() {
        this.selectedUser = undefined;
        this.selectedUserIndex = undefined;
    }

    // Search events based on input supplied
    filterQuery(e: any): void { // e needs to be InputEvent!
        console.log('event val', e.target.value);
        this.querySearch.filter = e.target.value;

        setTimeout(() => {
            this.listenerLookupForm();
        }, 0);
    }

    clearData(): void {
        this.elQuestionName.nativeElement.focus();
        this.querySearch.filter = '';
        this.querySearch.callType = 0;
        this.querySearch.state = 0;
        this.timestamp = undefined;
        this.queries = [];
        //this.listenerLookupForm();
    }

    listenerLookupForm() {
        this.queryService.listenerLookupForm(this.querySearch, this.pagination.currentPage).then((res: any) => {
            this.queries = res.data;
            let queries: any[] = [];

            this.queries.forEach((val) => {
                let query: any = Object.assign({}, val);
                query.callerId = query.callerId.replace('+1', '');
                queries.push(query);
            });

            this.queries = queries;

            this.pagination.totalItems = res.totalRecordCount;
            this.clearSelectedUser();
            console.log(res.data);
        }).catch((msg) => {
            this.modal.alert().title('Error').body(`${msg}`)
                .open()
                .then(() => {});
        });
    }

    raiseHandData() {
        if (!this.selectedUser) return false;

        this.queryService.raisedHand(this.selectedUser).then((res) => {
            console.log(res);
        }).catch((msg) => {
            this.modal.alert().title('Error').body(`${msg}`)
                .open()
                .then(() => {});
        });

    }

    bringlive() {
        if (!this.selectedUser) return false;

        this.queryService.bringListenertoLive(this.selectedUser).then((res) => {
            console.log(res);
        }).catch((msg) => {
            this.modal.alert().title('Error').body(`${msg}`)
                .open()
                .then(() => {});
        });
    }

    timestampQuery(): void {
        this.timestamp = Date.now();
    }

    pageChanged(page: number) {
        this.pagination.currentPage = page;
        this.listenerLookupForm();
    }

}