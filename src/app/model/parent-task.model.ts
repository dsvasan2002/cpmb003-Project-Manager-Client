export class ParentTaskClass {
    public parentTaskId: number;
    public parentTaskName: string;
    public projectId: number;
    constructor(){}
}
export interface IParentTask {
    parentTaskId: number,
    parentTaskName: string,
    projectId: number
}

