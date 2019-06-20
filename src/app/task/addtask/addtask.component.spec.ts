import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskComponent } from './addtask.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/service/task.service';
import { ProjectSearchComponent } from './modal/project-search/project-search.component';
import { TaskSearchComponent } from './modal/task-search/task-search.component';
import { UserSearchComponent } from 'src/app/project/modal/user-search/user-search.component';

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtaskComponent, ProjectSearchComponent, TaskSearchComponent, UserSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule.forRoot() ],
      providers: [FormBuilder, TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
