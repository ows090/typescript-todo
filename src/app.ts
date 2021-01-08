import ProjectInput from "./components/project-input";
import { ProjectStatus } from "./models/project";
import { ProjectState } from "./state/project-state";
console.log('start');
const projectState = ProjectState.getInstance();
new ProjectInput();
