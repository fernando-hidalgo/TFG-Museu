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

    public getListContent(artlistId: number): Observable<Object> {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTLIST}${artlistId}`);
    }

}