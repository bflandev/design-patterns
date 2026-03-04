/**
 * Memento Design Pattern
 *
 * The Memento pattern provides the ability to restore an object to its previous state (undo via rollback).
 */

// Memento
class Memento {
    constructor(private state: string) {}

    public getState(): string {
        return this.state;
    }
}

// Originator
class Originator {
    private state: string;

    public setState(state: string): void {
        console.log(`Originator: Setting state to ${state}`);
        this.state = state;
    }

    public save(): Memento {
        console.log("Originator: Saving to Memento.");
        return new Memento(this.state);
    }

    public restore(memento: Memento): void {
        this.state = memento.getState();
        console.log(`Originator: State after restoring from Memento: ${this.state}`);
    }
}

// Caretaker
class Caretaker {
    private mementos: Memento[] = [];

    constructor(private originator: Originator) {}

    public backup(): void {
        console.log("\nCaretaker: Saving Originator's state...");
        this.mementos.push(this.originator.save());
    }

    public undo(): void {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();

        console.log(`Caretaker: Restoring state to: ${memento.getState()}`);
        this.originator.restore(memento);
    }
}

// Example usage
function runMementoExample() {
    const originator = new Originator();
    const caretaker = new Caretaker(originator);

    originator.setState("State #1");
    originator.setState("State #2");
    caretaker.backup();

    originator.setState("State #3");
    caretaker.backup();

    originator.setState("State #4");

    console.log("");
    caretaker.undo();
    caretaker.undo();
}

runMementoExample();
