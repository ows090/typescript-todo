export enum ProjectStatus {
    Active,
    Finished,
}

export class Project {
    private id: string;
    title: string;
    description: string;
    people: number;
    status : ProjectStatus;
    constructor(
        title: string,
        description: string,
        people: number,
        status: ProjectStatus.Active
    ){
        this.id = Math.random().toString();
        this.title = title;
        this.description= description;
        this.people = people;
        this.status = status;
    };
}