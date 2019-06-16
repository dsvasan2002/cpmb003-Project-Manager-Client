import { ParentTaskClass, IParentTask } from './parent-task.model';
import { ProjectClass, IProject } from './project.model';
import { UserClass, IUser } from './user.model';

export class TaskClass {
    public taskId: number;
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
    taskId: number;
    taskName: string;
    parentId: IParentTask;
    projectId: IProject;
    startDate: Date;
    endDate: Date;
    priority: number;
    hasFinished: boolean;
    user: IUser;
}
