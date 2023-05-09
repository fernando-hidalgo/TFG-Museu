import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "src/constants";
import { AppEndpoints } from "../app.endpoints";

@Injectable({
    providedIn: 'root'
})

export class RatingService {

    constructor(private httpClient: HttpClient) { }

    public getRatingById(id) {
        return this.httpClient.get(`${HOST}${AppEndpoints.RATING}${id}`);
    }

    public getRatingByArtworkId(id) {
        return this.httpClient.get(`${HOST}${AppEndpoints.RATING_OF_ARTWORK}${id}`);
    }

    public createRating(body){
        return this.httpClient.post(`${HOST}${AppEndpoints.RATING}`, body);
    }

    public updateRating(id, body){
        return this.httpClient.put(`${HOST}${AppEndpoints.RATING}${id}`, body);
    }

    public deleteRating(id){
        return this.httpClient.delete(`${HOST}${AppEndpoints.RATING}${id}`);
    }

}