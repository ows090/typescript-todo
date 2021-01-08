export default abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
> {
    hostElement: T;
    targetElement: U;

    constructor(
        hostElementId: string,
        templateElementId: string,
        isAfterBegin: boolean,
        targetElementId?: string
    ) {
        this.hostElement = document.getElementById(hostElementId)! as T;
        const importedNode = document.importNode(
            document.getElementById(templateElementId)! as HTMLTemplateElement,
            true
        );
        this.targetElement = importedNode.content.firstElementChild! as U;
        console.log(targetElementId);
        if(targetElementId) this.targetElement.id = targetElementId;
        this.attach(isAfterBegin);
    }

    private attach(isAfterBegin: boolean): void {
        this.hostElement.insertAdjacentElement(
            isAfterBegin ? 'afterbegin' : 'beforeend',
            this.targetElement
        );
    }

    abstract configure():void;

    abstract renderContent(): void;
}
