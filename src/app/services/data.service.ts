import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INITIALDATA } from '../initial-data';
import { of } from 'rxjs/observable/of';
import { ITodoList } from '../interfaces/itodo-list';

@Injectable()
export class DataService {

  public getInitialData(): Observable<ITodoList[]> {
    return of(INITIALDATA);
  }

  public getSpecificData(id: number): Observable<ITodoList> {
    return of(INITIALDATA.find((todo: ITodoList) => todo.id === id));
  }

  constructor() {}
}
