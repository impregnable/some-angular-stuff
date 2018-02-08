import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '../../services/data.service';
import { ITodoList } from '../../interfaces/itodo-list';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  public list: ITodoList[];
  public subscription: Subscription;

  public addTodoList(name: string): void {
    if (name) {
      const title = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();

      this.list.push({
        id: this.list.length,
        title: title,
        content: [],
        amount: 0
      } as ITodoList);
    }
  }

  private getList(): void {
    this.subscription = this.dataService.getInitialData().subscribe((data: ITodoList[]) => this.list = data);
  }

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.getList();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
