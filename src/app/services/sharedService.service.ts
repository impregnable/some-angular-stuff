import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  private _fulfilledList: string[];
  set fulfilledList(list: string[]) {
    this._fulfilledList = list;
  }
  get fulfilledList(): string[] {
    return this._fulfilledList;
  }

  constructor() {}
}
