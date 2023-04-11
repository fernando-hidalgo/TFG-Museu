import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HOST } from "src/constants";
import { AppEndpoints } from "../app.endpoints";

@Injectable({
    providedIn: 'root'
})

export class ArtlistService {

    constructor(private httpClient: HttpClient) { }

    public getUserLists(userId: number): Observable<Object> {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTLIST_OF_USER}${userId}`);
    }

    public getListContent(artlistId: number, params): Observable<Object> {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTLIST}${artlistId}`, {params});
    }

    public getListToEdit(artlistId: number, body?): Observable<Object> {
        return this.httpClient.put(`${HOST}${AppEndpoints.ARTLIST_TO_EDIT}${artlistId}`, body);
    }

    public findFiltered(artlistId: number, params) {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTLIST_SEARCH}${artlistId}`, {params});
    }

    public updateList(artlistId: number, body) {
        return this.httpClient.put(`${HOST}${AppEndpoints.ARTLIST}${artlistId}`, body);
    }

}