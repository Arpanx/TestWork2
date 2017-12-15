import { AfterViewInit, Component, EventEmitter, ViewChild, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { MatOptionSelectionChange } from '@angular/material';
import { MessageService } from '../services/index';

@Component({
    selector: 'app-list-clients',
    templateUrl: 'list-clients.component.html',
    styleUrls: ['list-clients.component.scss'],
})
export class ListClientsComponent implements AfterViewInit {
    displayedColumns = [/* 'select', */ 'firstName', 'lastName', 'address', 'phoneNumbers'];
    exampleDatabase: ClientHttpDao | null;
    dataSource = new MatTableDataSource<Client>();

    resultsLength = 0;
    isLoadingResults = false;
    isRateLimitReached = false;
    filteredStates: Observable<any[]>;
    cityPredicate: any[];
    selection = new SelectionModel<Client>(true, []);
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: HttpClient,
        private messageService: MessageService) {
    }

    sendMessage(row: any) {
        this.notify.emit('payload');
        this.messageService.sendMessage(row);
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    onSelectedCity(evt: MatOptionSelectionChange, city: any) {
        if (evt.source.selected) {
            if (isNaN(city)) {
                this.applyFilter('');
            }
            this.applyFilter(city);
        }
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    ngAfterViewInit() {
        this.exampleDatabase = new ClientHttpDao(this.http);
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                return this.exampleDatabase!.getClientAll(
                    this.sort.active, this.sort.direction, this.paginator.pageIndex);
            }),
            map(data => {
                // Flip flag to show that loading has finished.
                this.isLoadingResults = false;
                this.isRateLimitReached = false;
                this.resultsLength = data.value.totalCount;
                this.cityPredicate = data.value.listDistinctCity;
                return data.value.listClients;
            }),
            catchError(() => {
                this.isLoadingResults = false;
                // Catch if the Server API has reached its rate limit. Return empty data.
                this.isRateLimitReached = true;
                return observableOf([]);
            })
            ).subscribe(data => this.dataSource.data = data);
    }
}

export interface AionysApi {
    value: { totalCount: number, listDistinctCity: string[], listClients: Client[] }
}

export interface Client {
    select: boolean;
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumbers: string;
    city: string;
}

export class ClientHttpDao {
    constructor(private http: HttpClient) { }

    getClientAll(sort: string, order: string, page: number): Observable<AionysApi> {
        const href = 'http://localhost:5000/api/client';
        let requestUrl = `${href}=${sort}&order=${order}&page=${page + 1}`;
        requestUrl = `${href}/${page + 1}`;
        const res = this.http.get<AionysApi>(requestUrl);

        return res;
    }
}

