import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TodoItem } from "./app.component";


@Injectable({ providedIn:'root'})
export class TodoService{

  private baseUrl = 'http://localhost:8080/todos/api';

  constructor(private http: HttpClient){}

  getTasks(): Observable<TodoItem[]>{
    return this.http.get<TodoItem[]>(this.baseUrl);
  }

  addTask(task : TodoItem): Observable<TodoItem>{
    return this.http.post<TodoItem>(this.baseUrl,task);
  }

  deleteTask(id: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }

  updateTask(task: TodoItem): Observable<TodoItem>{
    return this.http.put<TodoItem>(`${this.baseUrl}/${task.id}`, task)
  }

}


