/**
 * Observer Design Pattern
 *
 * The Observer pattern is a behavioral design pattern that defines a one-to-many
 * dependency between objects so that when one object changes state, all its dependents
 * are notified and updated automatically.
 */

// Subject
interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

// Concrete Subject
class ConcreteSubject implements Subject {
    public state: number;
    private observers: Observer[] = [];

    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }

    public notify(): void {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    public someBusinessLogic(): void {
        console.log('\nSubject: I\'m doing something important.');
        this.state = Math.floor(Math.random() * (10 + 1));

        console.log(`Subject: My state has just changed to: ${this.state}`);
        this.notify();
    }
}

// Observer
interface Observer {
    update(subject: Subject): void;
}

// Concrete Observers
class ConcreteObserverA implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && subject.state < 3) {
            console.log('ConcreteObserverA: Reacted to the event.');
        }
    }
}

class ConcreteObserverB implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && (subject.state === 0 || subject.state >= 2)) {
            console.log('ConcreteObserverB: Reacted to the event.');
        }
    }
}

// Example usage
function runObserverExample() {
    const subject = new ConcreteSubject();

    const observer1 = new ConcreteObserverA();
    subject.attach(observer1);

    const observer2 = new ConcreteObserverB();
    subject.attach(observer2);

    subject.someBusinessLogic();
    subject.someBusinessLogic();

    subject.detach(observer2);

    subject.someBusinessLogic();
}

runObserverExample();
