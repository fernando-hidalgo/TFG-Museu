import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "src/constants";
import { AppEndpoints } from "../app.endpoints";

@Injectable({
    providedIn: 'root'
})

export class ArtworkService {

    constructor(private httpClient: HttpClient) { }

    public getArtworkById(id) {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTWORK}${id}`);
    }

    public updateArtowrk(id, body) {
        return this.httpClient.put(`${HOST}${AppEndpoints.ARTWORK}${id}`, body);
    }

    public getAllArtworks() {
        return this.httpClient.get<any>(`${HOST}${AppEndpoints.ARTWORK}`);
    }

    public findFiltered(params) {
        return this.httpClient.get<any>(`${HOST}${AppEndpoints.ARTWORK_SEARCH}`, {params});
    }

}