/**
 * Command Design Pattern
 *
 * The Command pattern is a behavioral design pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as a method arguments, delay or queue a request's execution, and support undoable operations.
 */

// Command
interface Command {
    execute(): void;
}

// Concrete Commands
class SimpleCommand implements Command {
    constructor(private payload: string) {}

    public execute(): void {
        console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`);
    }
}

class ComplexCommand implements Command {
    constructor(private receiver: Receiver, private a: string, private b: string) {}

    public execute(): void {
        console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    }
}

// Receiver
class Receiver {
    public doSomething(a: string): void {
        console.log(`Receiver: Working on (${a}.)`);
    }

    public doSomethingElse(b: string): void {
        console.log(`Receiver: Also working on (${b}.)`);
    }
}

// Invoker
class Invoker {
    private onStart: Command;
    private onFinish: Command;

    public setOnStart(command: Command): void {
        this.onStart = command;
    }

    public setOnFinish(command: Command): void {
        this.onFinish = command;
    }

    public doSomethingImportant(): void {
        console.log('Invoker: Does anybody want something done before I begin?');
        if (this.isCommand(this.onStart)) {
            this.onStart.execute();
        }

        console.log('Invoker: ...doing something really important...');

        console.log('Invoker: Does anybody want something done after I finish?');
        if (this.isCommand(this.onFinish)) {
            this.onFinish.execute();
        }
    }

    private isCommand(object): object is Command {
        return object.execute !== undefined;
    }
}

// Example usage
function runCommandExample() {
    const invoker = new Invoker();
    invoker.setOnStart(new SimpleCommand('Say Hi!'));
    const receiver = new Receiver();
    invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

    invoker.doSomethingImportant();
}

runCommandExample();
