import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharedService } from '../../services/sharedService.service';
import { ITodoList } from '../../interfaces/itodo-list';
import { DataService } from '../../services/data.service';
import { ITodoListItem } from '../../interfaces/itodo-list-item';

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit, OnDestroy {

  public todoId: number;
  public currentTodo: ITodoList;
  public fulfilledList: ITodoListItem[];
  public todoToShow: ITodoListItem[];
  public subscription: Subscription;
  public keys = Object.keys;
  public search: string;

  public addTodo(event: KeyboardEvent): void {
    const value = (<HTMLInputElement>event.target).value;

    if (value && event.keyCode === 13 && this.currentTodo) {
      this.currentTodo.content.push({
        id: this.currentTodo.content.length,
        name: value
      });
      this.currentTodo.amount++;
      if (this.search) {
        this.searchTodo();
      }
    }
  }

  public searchTodo(): void {
    this.todoToShow = this.currentTodo.content.filter((el: ITodoListItem) => el.name.indexOf(this.search.toLowerCase()) !== -1);
  }

  public fulfilTodoEl(id: number, name: string): void {
    let alreadyHere: boolean;

    this.fulfilledList.forEach((fulfilledEl: ITodoListItem) => {
      if (fulfilledEl.name === name && fulfilledEl.id === id) {
        alreadyHere = true;
      }
    });

    if (!alreadyHere) {
      this.fulfilledList.push({id: id, name: name});
      this.currentTodo.amount--;
      this.sharedService.fulfilledList = this.fulfilledList;
    }
  }

  public isFulfilled(id: number, name: string): boolean {
    if (!this.fulfilledList) {
      this.fulfilledList = [];
      if (this.sharedService.fulfilledList) {
        this.fulfilledList = this.sharedService.fulfilledList;
      }
    }
    return this.fulfilledList.some((el: ITodoListItem) => el.id === id && el.name === name);
  }

  private getCurrentTodo(): void {
    this.subscription = this.dataService.getSpecificData(this.todoId).subscribe((todo: ITodoList) => {
      this.currentTodo = todo;
      if (this.currentTodo) {
        this.todoToShow = this.currentTodo.content;
      }
    })
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.todoId = Number(param.get('id'));
      this.getCurrentTodo();
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
