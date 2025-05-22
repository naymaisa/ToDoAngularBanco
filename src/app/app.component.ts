import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './todo.service';

export interface TodoItem{
  id?:string;
  task:string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor,NgClass, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  todoList :TodoItem[]= [];
  newTask : string='';

  constructor(private todoService: TodoService){}

  ngOnInit(){
    this.todoService.getTasks().subscribe(tasks => this.todoList= tasks);
  }

  addTask():void{
    if(this.newTask.trim()!== ''){
      const task: TodoItem ={
        task: this.newTask,
        completed: false
      }
      this.todoService.addTask(task).subscribe(created => {
         this.todoList.push(created)
      this.newTask=''
      })
    }
  }
  toggleCompleted(index:number){
    const task = this.todoList[index];
    task.completed =!task.completed;
    this.todoService.updateTask(task).subscribe(updated=>{
      this.todoList[index] =updated;
    })
  }

  deleteTask(id:string){
    this.todoService.deleteTask(id).subscribe(()=>{
 this.todoList= this.todoList.filter(task => task.id !== id)
    })
}

}

