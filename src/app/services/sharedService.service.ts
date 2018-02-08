import { Injectable } from '@angular/core';

import { ITodoListItem } from '../interfaces/itodo-list-item';

@Injectable()
export class SharedService {

  private _fulfilledList: ITodoListItem[];
  set fulfilledList(list: ITodoListItem[]) {
    this._fulfilledList = list;
  }
  get fulfilledList(): ITodoListItem[] {
    return this._fulfilledList;
  }

  constructor() {}
}
