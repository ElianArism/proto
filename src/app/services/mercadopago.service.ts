import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class MercadoPagoService {
    
    private _url: string = environment.backend_url;

    constructor(private _httpClient: HttpClient) {}

    getGlobalId(id: string) {
        return this._httpClient.get(`${this._url}/api/payment/${id}`)
            .pipe(
                map((res:any) => {
                    return res.global_id;
                })
            )
    }
}   