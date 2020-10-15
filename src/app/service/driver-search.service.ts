import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverSearchService {

  private url1 = 'http://18.225.8.135:5000/api/v1/payment';

  constructor(private http: HttpClient) {
  }
  searchDriverNo(Dlno: string): Observable<null> {
    return this.http.get<null>(this.url1 + `/${Dlno}`);
  }
  public EfinePay(datas): Observable<null> {
    return this.http.post<null>(this.url1, datas);
  }
}
