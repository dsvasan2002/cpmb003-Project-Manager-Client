import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddtaskComponent } from '../task/addtask/addtask.component';
import { ProjectSearchComponent } from '../task/addtask/modal/project-search/project-search.component';
import { TaskSearchComponent } from '../task/addtask/modal/task-search/task-search.component';
import { UserSearchComponent } from '../project/modal/user-search/user-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router,  } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter: any;
  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, AddtaskComponent, ProjectSearchComponent, TaskSearchComponent, UserSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientModule, HttpClientTestingModule, NgbModule.forRoot() ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to cpmb003-Project-Manager-Client');
  });

  // it ('can get RouterLinks from template',() =>{

  // });
});
