import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: boolean;
  public todoCategory: string;
  public todoBody: string;
  public viewType: 'card' | 'list' = 'card';

  constructor(private todoService: TodoService, private snackBar: MatSnackBar) { }


  getTodosFromServer() {
    this.todoService.getTodos({
      owner: this.todoOwner,
      status: this.todoStatus,
      category: this.todoCategory,
      body: this.todoBody
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      console.error('We couldn\'t get the list of todos; the server might be down');
      this.snackBar.open(
        'Problem contacting the server – try again',
        'OK',
        {duration: 3000});
    });
  }

  public updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { owner: this.todoOwner, status: this.todoStatus,
       category: this.todoCategory, body: this.todoBody }
    );
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }

}
