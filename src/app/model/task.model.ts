export class TaskClass {
    public taskId: Number;
    public taskName: string;
    public parentId: any;
    public projectId: any;
    public startDate: Date;
    public endDate: Date;
    public priority: number = 0;
    public hasFinished: boolean = true;
    public user: any;
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
