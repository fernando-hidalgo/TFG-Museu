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

    public getUserById(id): Observable<boolean> {
        return this.httpClient.get(`${HOST}${AppEndpoints.USER}${id}`) as Observable<boolean>;
    }

    public getUserNicknameById(id): Observable<any> {
        return this.httpClient.get(`${HOST}${AppEndpoints.USER_NICKNAME}${id}`) as Observable<boolean>;
    }

    public userAvailable(params): Observable<Boolean> {
        return this.httpClient.get(`${HOST}${AppEndpoints.USER_AVAILABLE}`, {params}) as Observable<Boolean>;
    }

    public checkUserAccountExists(params): Observable<Object> {
        return this.httpClient.get(`${HOST}${AppEndpoints.USER_ACCOUNT_EXISTS}`, {params});
    }

    public createUser(body): Observable<number> {
        return this.httpClient.post(`${HOST}${AppEndpoints.CREATE_REGULAR_USER}`, body) as Observable<number>;
    }

    public saveProfilePic(userId: number, file): Observable<string>{
        return this.httpClient.post(`${HOST}${AppEndpoints.USER_PROFILE_PIC}${userId}`, file) as Observable<string>;
    }

    public getProfilePic(userId: number): Observable<string>{
        return this.httpClient.get(`${HOST}${AppEndpoints.USER_PROFILE_PIC}${userId}`) as Observable<string>;
    }
}