import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { DataService } from './services/data.service';
import { SharedService } from './services/sharedService.service';

const routes: Routes = [
  {
    path: 'list',
    component: TodoListComponent,
    children: [
      {
        path: ':id',
        component: TodoDetailComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ DataService, SharedService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
