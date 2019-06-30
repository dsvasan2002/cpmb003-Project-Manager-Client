import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSearchComponent } from './task-search.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/service/task.service';
import { of } from 'rxjs';
import { ParentTaskService } from 'src/app/service/parent-task.service';
import { ParentTaskClass } from 'src/app/model/parent-task.model';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;
  let ptaskService: ParentTaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule.forRoot() ],
      providers: [FormBuilder, TaskService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSearchComponent);
    ptaskService = TestBed.get(ParentTaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('call selectParentTask', () => {
    const aParentTask: ParentTaskClass = {parentTaskId: 1, parentTaskName: 'UpdatedParentTaskName1', projectId: 1};
    const spyService = spyOn(ptaskService, 'getAParentTask').and.returnValue(of({success: true, data: aParentTask}));
    component.selectParentTask(aParentTask.parentTaskId);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledWith(aParentTask.parentTaskId);
    expect(component.aParentTask.parentTaskId).toBe(aParentTask.parentTaskId);
    expect(component.enableAddButton).toBe(true);
  });

});
