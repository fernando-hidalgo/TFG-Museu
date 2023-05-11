import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HOST } from "src/constants";
import { AppEndpoints } from "../app.endpoints";

@Injectable({
    providedIn: 'root'
})

export class ArtlistService {

    constructor(private httpClient: HttpClient) { }

    public getListById(artlistId: number): Observable<boolean> {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTLIST}${artlistId}`) as Observable<boolean>;
    }

    public getUserLists(userId: number): Observable<any> {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTLIST_OF_USER}${userId}`);
    }

    public getListContent(artlistId: number, params): Observable<any> {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTLIST_DETAILS}${artlistId}`, {params});
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

    public addToListModal(artworkId: number, body) {
        return this.httpClient.put(`${HOST}${AppEndpoints.ADD_TO_LIST_MODAL}${artworkId}`, body);
    }

    public deleteList(artlistId: number) {
        return this.httpClient.delete(`${HOST}${AppEndpoints.ARTLIST}${artlistId}`);
    }

    public saveCover(artlistId: number, file){
        return this.httpClient.post(`${HOST}${AppEndpoints.ARTLIST_COVER_IMAGE}${artlistId}`, file);
    }

    public getCover(artlistId: number){
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTLIST_COVER_IMAGE}${artlistId}`);
    }


}