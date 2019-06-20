import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ViewtaskComponent } from './viewtask.component';
import { TaskService } from 'src/app/service/task.service';
import { of } from 'rxjs';
import { TaskClass } from 'src/app/model/task.model';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TaskSearchComponent } from '../addtask/modal/task-search/task-search.component';
import { ProjectSearchComponent } from '../addtask/modal/project-search/project-search.component';
import { UserSearchComponent } from 'src/app/project/modal/user-search/user-search.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';

describe('ViewtaskComponent', () => {
  let component: ViewtaskComponent;
  let fixture: ComponentFixture<ViewtaskComponent>;
  let service: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtaskComponent, TaskSearchComponent, ProjectSearchComponent, UserSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule.forRoot() ],
      providers: [FormBuilder, UserService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtaskComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('call finishTask with task', fakeAsync(() => {
    const spy = spyOn(service, 'updateATask').and.returnValue(
    of({success: false})
  );

  component.finishTask(component.tasksList[0]);
  expect (spy).toHaveBeenCalledWith(component.tasksList[0]);
}));

});
