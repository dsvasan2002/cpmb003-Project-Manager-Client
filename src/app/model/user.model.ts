export class UserClass {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public employeeId: string;
    public projectId: string;
    public taskId: string[];
    constructor(){}
}

export interface IUser {
    userId: number,
    firstName: string,
    lastName: String,
    employeeId: number,
    projectId: number,
    taskId: number
}