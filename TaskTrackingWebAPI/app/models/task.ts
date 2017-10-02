export interface ITask {
    Id: number;
    Title: string;
    Description: string;
    CreatedDate: Date;
    ModifiedDate: Date;
    State: number;
    StateDesc: string;
}