export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        get() {
            return originalMethod.bind(this);
        },
        configurable: true,
    };
    return adjDescriptor;
}
