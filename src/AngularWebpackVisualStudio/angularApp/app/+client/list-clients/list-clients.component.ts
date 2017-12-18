import { AfterViewInit, Component, EventEmitter, ViewChild, Output } from '@angular/core';
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
import { ClientService } from '../../core/services/client-data.service';
import { Client } from '../../models/client';

@Component({
    selector: 'app-list-clients',
    templateUrl: 'list-clients.component.html',
    styleUrls: ['list-clients.component.scss'],
})
export class ListClientsComponent implements AfterViewInit {
    displayedColumns = [/* 'select', */ 'firstName', 'lastName', 'address', 'phoneNumbers'];
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

    constructor(private messageService: MessageService,
        private clientService: ClientService
    ) {
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
            if (city === 'none') {
                this.applyFilter('');

                return;
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
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
            startWith({}),
            switchMap(() => {
                setTimeout(() => {
                    this.isLoadingResults = true;
                });

                return this.clientService!.getClientAll(
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
                setTimeout(() => {
                    this.isRateLimitReached = true;
                });

                return observableOf([]);
            })
            ).subscribe(data => this.dataSource.data = data);
    }
}

export interface AionysApi {
    value: { totalCount: number, listDistinctCity: string[], listClients: Client[] }
}



