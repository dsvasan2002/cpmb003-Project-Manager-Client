import { ParentTaskClass } from './parent-task.model';
import { ProjectClass } from './project.model';
import { UserClass } from './user.model';

export class TaskClass {
    public taskId: Number;
    public taskName: string;
    public parentTask: ParentTaskClass;
    public project: ProjectClass;
    public startDate: Date;
    public endDate: Date;
    public priority: number = 0;
    public hasFinished: boolean = false;
    public user: UserClass;
    constructor(){}
}

export interface ITask {
    taskId: Number;
    taskName: string;
    parentId: any;
    projectId: any;
    startDate: Date;
    endDate: Date;
    priority: number;
    hasFinished: boolean;
    user: any;
}
