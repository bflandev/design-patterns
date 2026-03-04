/**
 * State Design Pattern
 *
 * The State pattern is a behavioral design pattern that allows an object to alter its behavior when its internal state changes. The object will appear to change its class.
 */

// State
interface State {
    handle(context: Context): void;
}

// Concrete States
class ConcreteStateA implements State {
    public handle(context: Context): void {
        console.log("ConcreteStateA handles request.");
        console.log("ConcreteStateA wants to change the state of the context.");
        context.transitionTo(new ConcreteStateB());
    }
}

class ConcreteStateB implements State {
    public handle(context: Context): void {
        console.log("ConcreteStateB handles request.");
        console.log("ConcreteStateB wants to change the state of the context.");
        context.transitionTo(new ConcreteStateA());
    }
}

// Context
class Context {
    private state: State;

    constructor(state: State) {
        this.transitionTo(state);
    }

    public transitionTo(state: State): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
        this.state = state;
    }

    public request(): void {
        this.state.handle(this);
    }
}

// Example usage
function runStateExample() {
    const context = new Context(new ConcreteStateA());
    context.request();
    context.request();
}

runStateExample();
