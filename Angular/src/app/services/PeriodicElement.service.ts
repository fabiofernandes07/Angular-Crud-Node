import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PeriodicElement} from '../models/PeriodicElement'

@Injectable()
export class PeriodicElementService {
  elementApiUrl = "http://localhost:3000/element";
  constructor(private http: HttpClient) { }

  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.elementApiUrl);
  }

  createElements(element: PeriodicElement) : Observable<PeriodicElement> {
    return this.http.post<PeriodicElement>(this.elementApiUrl, element);
  }

  editElement(id: string, element: PeriodicElement) : Observable<PeriodicElement> {
    return this.http.patch<PeriodicElement>(`${this.elementApiUrl}/${id}`, element);
  }

  deleteElement(id: string): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}/${id}`);
  }
}
