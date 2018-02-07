import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITodoList } from '../../interfaces/itodo-list';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/sharedService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit, OnDestroy {

  public todoId: number;
  public currentTodo: ITodoList;
  public fulfilledList: string[];
  public todoToShow: string[];
  public subscription: Subscription;

  public addTodo(event: KeyboardEvent): void {
    if (event.keyCode === 13 && this.currentTodo) {
      this.currentTodo.content.push((<HTMLInputElement>event.target).value);
      this.currentTodo.amount++;
    }
  }

  public searchTodo(event: KeyboardEvent): void {
    const value: string = `${(<HTMLInputElement>event.target).value}`;
    this.todoToShow = this.currentTodo.content.filter((el: string) => el.indexOf(value.toLowerCase()) !== -1);
  }

  /**
   * Well, the one and only 'bug' (that I've found) is here, in fulfilTodoEl method.
   * If you've got two or more TODOs with the same name... it would end badly... (my code gonna cross out both).
   * But I think that's this is NOT logical at all (I mean to have same TODOs) and that's not written in requirements... So...
   */
  public fulfilTodoEl(el: string): void {
    let alreadyHere: boolean;

    this.fulfilledList.forEach((fulfilledEl: string) => {
      if (fulfilledEl === el) {
        alreadyHere = true;
      }
    });

    if (!alreadyHere) {
      this.fulfilledList.push(el);
      this.currentTodo.amount--;
      this._sharedService.fulfilledList = this.fulfilledList;
    }
  }

  public isFulfilled(el: string): boolean {
    if (!this.fulfilledList) {
      this.fulfilledList = [];
      if (this._sharedService.fulfilledList) {
        this.fulfilledList = this._sharedService.fulfilledList;
      }
    }
    return this.fulfilledList.indexOf(el) !== -1;
  }

  private _getCurrentTodo(): void {
    this.subscription = this._dataService.getSpecificData(this.todoId).subscribe((todo: ITodoList) => {
      this.currentTodo = todo;
      if (this.currentTodo) {
        this.todoToShow = this.currentTodo.content;
      }
    })
  }

  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _sharedService: SharedService
  ) {
    this.todoId = +this._route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this._getCurrentTodo();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
