import { autobind } from "../decorators/autobind";
import { draggable } from "../models/draggable";
import { Project, ProjectStatus } from "../models/project";
import Component from "./base-component";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements draggable{
    projectTitleElement: HTMLHeadingElement;
    projectDescElement:HTMLParagraphElement;

    constructor(hostId : string, private project:Project){
        super(hostId, "project-item", false, project.id);
        this.projectTitleElement = this.targetElement.querySelector('h4')!;
        this.projectDescElement = this.targetElement.querySelector('p')!;
        this.configure();
        this.renderContent();
    }

    @autobind
    dragStartHandler(e: DragEvent): void {
        console.log('dragStart');
        e.dataTransfer!.setData('text/plain', this.project.id);
    }

    dragEndHandler(e: DragEvent): void {
        console.log('dragEnd');
    }

    configure(): void {
        this.targetElement.addEventListener('dragstart', this.dragStartHandler);
        this.targetElement.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent(): void {
        this.projectTitleElement.textContent = this.project.title;
        this.projectDescElement.textContent = `${this.project.description} : ${this.project.people}`;
    }

}