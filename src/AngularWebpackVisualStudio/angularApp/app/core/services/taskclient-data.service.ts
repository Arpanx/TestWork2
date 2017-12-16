import { AionysApi } from '../../+client/list-client-tasks/list-client-tasks.component';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../app.constants';
import { TaskClient } from './../../models/taskclient';

@Injectable()
export class TaskClientService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient, configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/taskclient/';

        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }


    getBySortByOrderByPageByIdClient(sort: string, order: string, page: number, idClient: number): Observable<AionysApi> {
        console.log (sort); console.log (order); console.log (page);
            return this.http.get<AionysApi>(this.actionUrl + `${idClient}`, { headers: this.headers });
    }

    getAll(): Observable<TaskClient[]> {
        return this.http.get<TaskClient[]>(this.actionUrl, { headers: this.headers });
    }

    getSingle(id: number): Observable<TaskClient> {
        return this.http.get<TaskClient>(this.actionUrl + id, { headers: this.headers });
    }

    add(thingToAdd: TaskClient): Observable<TaskClient> {
        const toAdd = JSON.stringify({ name: thingToAdd });

        return this.http.post<TaskClient>(this.actionUrl, toAdd, { headers: this.headers });
    }

    update(id: number, itemToUpdate: any): Observable<TaskClient> {
        return this.http
            .put<TaskClient>(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(this.actionUrl + id, { headers: this.headers });
    }
}
