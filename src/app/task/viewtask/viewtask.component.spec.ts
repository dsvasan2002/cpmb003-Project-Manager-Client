import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ViewtaskComponent } from './viewtask.component';
import { TaskService } from 'src/app/service/task.service';
import { of } from 'rxjs';
import { TaskClass } from 'src/app/model/task.model';

describe('ViewtaskComponent', () => {
  let component: ViewtaskComponent;
  let fixture: ComponentFixture<ViewtaskComponent>;
  let service: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtaskComponent ]
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
