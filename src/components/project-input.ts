import { autobind } from '../decorators/autobind';
import { Project, ProjectStatus } from '../models/project';
import { Validatable, validate } from '../models/validation';
import { ProjectState } from '../state/project-state';
import Component from './base-component';

export default class ProjectInput extends Component<
    HTMLDivElement,
    HTMLFormElement
> {
    titleElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleElement: HTMLInputElement;

    constructor() {
        super('app', 'project-input', true, 'project-form');
        this.titleElement = this.targetElement.querySelector(
            '#title'
        )! as HTMLInputElement;
        this.descriptionElement = this.targetElement.querySelector(
            '#description'
        ) as HTMLInputElement;
        this.peopleElement = this.targetElement.querySelector(
            '#people'
        ) as HTMLInputElement;
        this.configure();
    }

    private clearInput() {
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.peopleElement.value = '';
    }

    @autobind
    private submitHandler(e: Event) {
        e.preventDefault();
        const valResult = this.gatherInputs();
        this.clearInput();
        if (!valResult) {
            return alert('there is invalid input');
        }
        const projectState = ProjectState.getInstance();
        projectState.addProject(
            new Project(
                valResult[0],
                valResult[1],
                valResult[2],
                ProjectStatus.Active
            )
        );
    }

    private gatherInputs(): [string, string, number] | undefined {
        const titleVal: Validatable = {
            value: this.titleElement.value,
            required: true,
        };
        const desciptionVal: Validatable = {
            value: this.descriptionElement.value,
            required: true,
        };
        const peopleVal: Validatable = {
            value: parseInt(this.peopleElement.value),
            required: true,
            min: 3,
        };

        if (
            !validate(titleVal) ||
            !validate(desciptionVal) ||
            !validate(peopleVal)
        ) {
            return undefined;
        }
        return [
            this.titleElement.value,
            this.descriptionElement.value,
            parseInt(this.peopleElement.value),
        ];
    }

    configure(): void {
        this.targetElement.addEventListener('submit', this.submitHandler);
    }
    renderContent(): void {}
}
