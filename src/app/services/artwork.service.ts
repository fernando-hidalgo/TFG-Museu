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

    public getAllArtworks() {
        return this.httpClient.get<any>(`${HOST}${AppEndpoints.ARTWORK}`);
    }

}