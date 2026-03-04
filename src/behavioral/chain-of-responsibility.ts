/**
 * Chain of Responsibility Design Pattern
 *
 * The Chain of Responsibility pattern creates a chain of receiver objects for a request.
 * This pattern decouples sender and receiver of a request based on the type of request.
 */

// Handler
interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string | null;
}

// Abstract Handler
abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | null = null;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

// Concrete Handlers
class MonkeyHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'Banana') {
            return `Monkey: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

class SquirrelHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'Nut') {
            return `Squirrel: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

class DogHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'MeatBall') {
            return `Dog: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

// Client
function runChainOfResponsibilityExample() {
    const monkey = new MonkeyHandler();
    const squirrel = new SquirrelHandler();
    const dog = new DogHandler();

    monkey.setNext(squirrel).setNext(dog);

    console.log('Chain: Monkey > Squirrel > Dog');
    console.log(`Who wants a Nut? ${monkey.handle('Nut')}`);
    console.log(`Who wants a Banana? ${monkey.handle('Banana')}`);
    console.log(`Who wants a MeatBall? ${monkey.handle('MeatBall')}`);
    console.log(`Who wants a Cup of coffee? ${monkey.handle('Cup of coffee')}`);
}

runChainOfResponsibilityExample();
