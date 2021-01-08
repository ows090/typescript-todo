export interface StateListner<T>{
    (state: T) : void;
}



export class State<T> {
    state: T;
    listeners: StateListner<T>[] = [];

    constructor(initialState: T){
        this.state = initialState;
    }

    addListener(listener: StateListner<T>){
        this.listeners.push(listener);
    }

    protected fireListeners(){
       for(const listener of this.listeners) {
           listener(this.state);
       }
    }
}
