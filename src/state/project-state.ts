import { Project, ProjectStatus } from '../models/project';
import { State } from './state';

export class ProjectState extends State<Project[]> {
    private static instance: ProjectState;

    private constructor(initialState: Project[]) {
        super(initialState);
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState([
            new Project('first State', 'first desc', 4, ProjectStatus.Active),
        ]);
        return this.instance;
    }

    addProject(project:Project){
        this.state.push(project);
        this.fireListeners();
    }

    getProjects(){
        return this.state;
    }
}
