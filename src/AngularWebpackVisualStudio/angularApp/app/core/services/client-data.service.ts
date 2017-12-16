import { AionysApi } from '../../+client/list-clients/list-clients.component';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../app.constants';
import { Client } from './../../models/client';

@Injectable()
export class ClientService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient, configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/client/';

        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }

    getClientAll(sort: string, order: string, page: number): Observable<AionysApi> {
        console.log(sort);
        console.log(order);
        return this.http.get<AionysApi>(this.actionUrl + `${page + 1}`, { headers: this.headers });
    }

    getAll(): Observable<Client[]> {
        return this.http.get<Client[]>(this.actionUrl, { headers: this.headers });
    }

    getSingle(id: number): Observable<Client> {
        return this.http.get<Client>(this.actionUrl + id, { headers: this.headers });
    }

    add(thingToAdd: Client): Observable<Client> {
        const toAdd = JSON.stringify({ name: thingToAdd });

        return this.http.post<Client>(this.actionUrl, toAdd, { headers: this.headers });
    }

    update(id: number, itemToUpdate: any): Observable<Client> {
        return this.http
            .put<Client>(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(this.actionUrl + id, { headers: this.headers });
    }
}
