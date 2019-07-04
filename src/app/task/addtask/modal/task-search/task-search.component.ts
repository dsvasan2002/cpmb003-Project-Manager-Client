import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ParentTaskClass } from 'src/app/model/parent-task.model';
import { ParentTaskService } from 'src/app/service/parent-task.service';

declare var $ :any;

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {

  @Output() selectedParentTask = new EventEmitter<ParentTaskClass>();

  filteredParentTasksList: ParentTaskClass[];
  parentTasksList: ParentTaskClass[];
  aParentTask: ParentTaskClass;
  private _searchParentTaskString: string;
  errorBlock: boolean = false;
  errorText: any;
  enableAddButton: boolean = false;


  constructor(private _parentTaskService: ParentTaskService) { 
    this.aParentTask = new ParentTaskClass();
  }

  ngOnInit() {
    this.getAllParentTasks();
  }

  getAllParentTasks() {
    this._parentTaskService.getAllParentTasks().subscribe((response: any)=>{
      if (response['success']) {
        this.parentTasksList = response['data'];
        this.filteredParentTasksList = response['data'];
      } 
    }, (error: any) => {
      this.errorBlock = true;
      this.errorText = error['message'];
    });
  }

  public get searchParentTaskString(): string {
    return this._searchParentTaskString;
  }
  public set searchParentTaskString(value: string) {
    this._searchParentTaskString = value;
    this.filteredParentTasksList = this.filterParentTasksByName(this._searchParentTaskString);
  }


  filterParentTasksByName(searchString: string): ParentTaskClass[] {
    return this.parentTasksList.filter(parent => 
      parent.parentTaskName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  selectParentTask(aParentTaskId: number) {
    this._parentTaskService.getAParentTask(aParentTaskId).subscribe((res: any)=> {
      if (res['success']) {
        this.aParentTask.parentTaskId = aParentTaskId;
        this.aParentTask = res['data'];
        this.enableAddButton = true;
      } else {
        //Handle error
        this.enableAddButton = false;
      }
    });
  }

  addParentTask() {
    this.selectedParentTask.emit(this.aParentTask);
    $('#parentTaskSearchModal').modal('toggle');
  }
}
