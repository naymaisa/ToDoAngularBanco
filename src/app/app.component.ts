import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface TodoItem{
  id:number;
  task:string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgFor,NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  todoList :TodoItem[]= [];
  newTask : string='';

  ngOnInit(){
    const saved = localStorage.getItem('todoList');
    if(saved){
      this.todoList= JSON.parse(saved);
    }
  }

  addTask():void{
    if(this.newTask.trim()!== ''){
      const newTodoItem: TodoItem ={
        id: Date.now(),
        task: this.newTask,
        completed: false
      }
      this.todoList.push(newTodoItem)
      this.newTask=''
    }
    localStorage.setItem('todoList',JSON.stringify(this.todoList));
  }
  toggleCompleted(index:number):void{
    this.todoList[index].completed = !this.todoList[index].completed
    localStorage.setItem('todoList',JSON.stringify(this.todoList));
  }

  deleteTask(id:number): void{
    this.todoList= this.todoList.filter(item => item.id !== id)
    console.log(this.todoList)
    localStorage.setItem('todoList',JSON.stringify(this.todoList));
  }
}



