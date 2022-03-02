import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Todo } from './todo';


@Injectable()
export class TodoService {

  readonly todoUrl: string = environment.apiUrl + 'todos';

  constructor(private httpClient: HttpClient) { }

  getTodos(filters?: {owner?: string; status?: boolean; category?: string; body?: string}): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.status !== undefined) {
        if (filters.status.valueOf() === true) {
          httpParams = httpParams.set('status', 'complete');
        }
        if (filters.status.valueOf() === false) {
          httpParams = httpParams.set('status', 'incomplete');
        }
      }
      if (filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }
    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
       params: httpParams,
      });
  }


  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(`${this.todoUrl}/${id}`);
  }

  filterTodos(todos: Todo[], filters: { owner?: string; status?: boolean; category?: string; body?: string}): Todo[] {
    let filteredTodos = todos;

    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner)!== -1);
    }

    if (filters.body) {
      filters.body = filters.body.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body)!== -1);
    }

    return filteredTodos;
  }
}
