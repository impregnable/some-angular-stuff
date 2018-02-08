import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

import { INITIAL_DATA } from '../initial-data';
import { ITodoList } from '../interfaces/itodo-list';

@Injectable()
export class DataService {

  public getInitialData(): Observable<ITodoList[]> {
    return of(INITIAL_DATA);
  }

  public getSpecificData(id: number): Observable<ITodoList> {
    return of(INITIAL_DATA.find((todo: ITodoList) => todo.id === id));
  }

  constructor() {}
}
