import { autobind } from '../decorators/autobind';
import { Droppable } from '../models/droppable';
import { Project, ProjectStatus } from '../models/project';
import { ProjectState } from '../state/project-state';
import Component from './base-component';
import { ProjectItem } from './project-item';

export class ProjectList
    extends Component<HTMLDivElement, HTMLDivElement>
    implements Droppable {
    titleElement: HTMLHeadingElement;
    listElement: HTMLUListElement;
    constructor(public type: 'active' | 'finished') {
        super('app', 'project-list', false, `${type}-area`);
        this.titleElement = this.targetElement.querySelector('h2')!;
        this.listElement = this.targetElement.querySelector('ul')!;
        this.listElement.id = `${type}-list`;
        this.configure();
        this.renderContent();
    }
    @autobind
    dragOverHandler(e: DragEvent): void {
        if (e.dataTransfer?.types[0] === 'text/plain') {
            e.preventDefault();
            this.targetElement.classList.add('drag-over');
        }
    }
    @autobind
    dropHandler(e: DragEvent): void {
        this.targetElement.classList.remove('drag-over');
        const projectId = e.dataTransfer!.getData('text/plain');
        const projectState = ProjectState.getInstance();
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
    }

    @autobind
    dragLeaveHandler(e: DragEvent): void {
        this.targetElement.classList.remove('drag-over');
    }

    configure(): void {
        this.targetElement.addEventListener('dragover', this.dragOverHandler);
        this.targetElement.addEventListener('drop', this.dropHandler);
        this.targetElement.addEventListener('dragleave', this.dragLeaveHandler);

        const projectState = ProjectState.getInstance();
        projectState.addListener((projects) => {
            this.listElement.innerHTML = '';
            this.renderProjects(projects);
        });
    }

    renderProjects(projects: Project[]): void {
        for (const project of projects) {
            if (project.status === ProjectStatus.Active) {
                if (this.type === 'active') {
                    new ProjectItem(this.listElement.id, project);
                }
            } else {
                if (this.type === 'finished') {
                    new ProjectItem(this.listElement.id, project);
                }
            }
        }
    }
    renderContent(): void {
        this.titleElement.textContent = this.type;
        this.renderProjects(ProjectState.getInstance().state);
    }
}
