import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "src/constants";
import { AppEndpoints } from "../app.endpoints";

@Injectable({
    providedIn: 'root'
})

export class ArtworkService {

    constructor(private httpClient: HttpClient) { }

    public getArtworkById(artworkId) {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTWORK}${artworkId}`);
    }

    public findArtworkRatedByUser(profileId, params) {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTWORK_RATED}${profileId}`, {params});
    }

    public findFilteredArtworkRatedByUser(profileId, params) {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTWORK_RATED_SEARCH}${profileId}`, {params});
    }

    public updateArtowrk(artworkId, body) {
        return this.httpClient.put(`${HOST}${AppEndpoints.ARTWORK}${artworkId}`, body);
    }

    public getAllArtworks(params) {
        return this.httpClient.get<any>(`${HOST}${AppEndpoints.ARTWORK}`, {params});
    }

    public findFiltered(params) {
        return this.httpClient.get<any>(`${HOST}${AppEndpoints.ARTWORK_SEARCH}`, {params});
    }

}