export class Project {
    public projectId: number;
    public projectName: string;
    public startDate: Date;
    public endDate: Date;
    public priority: number = 0;
    public managerId: number;
    constructor(){}

}
export interface IProject {
    projectId: number;
    projectName: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    managerId: number;

}
