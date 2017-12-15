import { TaskClientService } from '../../core/services/taskclient-data.service';
import { Subject } from 'rxjs/Rx';
import { Component, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
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
    selector: 'app-list-client-tasks',
    templateUrl: 'list-client-tasks.component.html',
    styleUrls: ['list-client-tasks.component.scss'],
})

export class ListClientTasksComponent implements AfterViewInit {
    displayedColumns = [/* 'select',  'clientid', */ 'taskName', 'description', 'startTime', 'endTime', 'address'];
    exampleDatabase: ExampleHttpDao | null;
    dataSource = new MatTableDataSource<TaskClients>();
    resultsLength = 0;
    isLoadingResults = false;
    isRateLimitReached = false;
    selection = new SelectionModel<TaskClients>(true, []);
    idClient = 0;
    userUpdated: EventEmitter<number> = new EventEmitter<number>();
    contextmenu = false;
    contextmenuX = 0;
    contextmenuY = 0;
    rowCurrent: number;

    @Output() change: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    childTitle = 'This text is passed to child';
    parentSubject: Subject<any> = new Subject();

    constructor(private http: HttpClient,
        private messageService: MessageService,
        private taskClientService: TaskClientService,
        ) {
        this.messageService.getMessage().subscribe(message => { this.EmitEventForGetClientTaskByIdClient(message.message.id) });
    }

    notifyChildren() {
        this.parentSubject.next('some value');
      }

    // activates the menu with the coordinates
    onrightClick(event: any, row: any) {
        event.preventDefault();
        if (!isNaN(row.id)) {
            this.rowCurrent = row.id
            this.contextmenuX = event.clientX
            this.contextmenuY = event.clientY
            this.contextmenu = true;
            this.parentSubject.next('open context menu');
        } else {
          console.log('Warrning Id current ROW Nan', row);
        }
      }

    // disables the menu
    disableContextMenu() {
       this.contextmenu = false;
      }

    EmitEventForGetClientTaskByIdClient(idClient: number) {
        // console.log(message.message.id);
        if (idClient > 0) {
            this.idClient = idClient;
            this.userUpdated.emit(0);
        }
      }

    deleteTaskById(event: any) { // event: any
        console.log(event);
        this.taskClientService.delete(this.rowCurrent).subscribe(
            res => {
              console.log(res);
              this.userUpdated.emit(0);
            },
            err => {
              console.log('Error occured', err);
            }
          );
      }

      ChangeNeedHideContextMenu() { // event: any
        // console.log(event);
        this.contextmenu = false;
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

    onSelectedCity(evt: MatOptionSelectionChange, food: any) {
        // this.selectedJobRoles.push(jobRole);
        // console.log('jobRole.id=' + food + ' (' + food.role + '). is-selected?=' + evt.source.selected);
        if (evt.source.selected) {
            // Do something with the new selected option here!!!!
            console.log(food);
            if (isNaN(food)) {
                this.applyFilter('');
            }
            this.applyFilter(food);
        }
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    ngAfterViewInit() {
        this.exampleDatabase = new ExampleHttpDao(this.http);
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page, this.userUpdated)
            .pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                return this.exampleDatabase!.getRepoIssues(
                    this.sort.active, this.sort.direction, this.paginator.pageIndex, this.idClient);
            }),
            map(data => {
                // Flip flag to show that loading has finished.
                this.isLoadingResults = false;
                this.isRateLimitReached = false;
                this.resultsLength = data.value.totalCount;

                return data.value.listTaskClients;
            }),
            catchError(() => {
                this.isLoadingResults = false;
                // Catch if the GitHub API has reached its rate limit. Return empty data.
                this.isRateLimitReached = true;

                return observableOf([]);
            })
            ).subscribe(data => this.dataSource.data = data);
    }
}

export interface AionysApi {
    value: { totalCount: number, listTaskClients: TaskClients[] }
}

export interface TaskClients {
    select: boolean;
    id: string;
    taskName: string;
    description: string;
    startTime: string;
    endTime: string;
    address: string;
    clientid: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
    constructor(private http: HttpClient) { }

    getRepoIssues(sort: string, order: string, page: number, idClient: number): Observable<AionysApi> {
        const href = 'http://localhost:5000/api/taskclient';
        let requestUrl =
            `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
        requestUrl =
            `${href}/${idClient}`;
        const getTaskClient = this.http.get<AionysApi>(requestUrl);
        // const del = this.http.delete<AionysApi>(requestUrl);
        // console.log(del);
        return getTaskClient;
    }
}
