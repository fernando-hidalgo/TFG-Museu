import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HOST } from "src/constants";
import { AppEndpoints } from "../app.endpoints";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private httpClient: HttpClient) { }

    public getUserByFields(params): Observable<Boolean> {
        return this.httpClient.get(`${HOST}${AppEndpoints.USER_BY_FIELD}`, {params}) as Observable<Boolean>;
    }

    public checkUserAccountExists(params): Observable<Object> {
        return this.httpClient.get(`${HOST}${AppEndpoints.USER_ACCOUNT_EXISTS}`, {params});
    }

    public createUser(body): Observable<Object> {
        return this.httpClient.post(`${HOST}${AppEndpoints.CREATE_REGULAR_USER}`, body);
    }
}