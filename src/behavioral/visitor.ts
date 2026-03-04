/**
 * Visitor Design Pattern
 *
 * The Visitor pattern is a behavioral design pattern that lets you separate algorithms from the objects on which they operate.
 */

// Visitor
interface Visitor {
    visitConcreteComponentA(element: ConcreteComponentA): void;
    visitConcreteComponentB(element: ConcreteComponentB): void;
}

// Concrete Visitor
class ConcreteVisitor1 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`);
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`);
    }
}

class ConcreteVisitor2 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`);
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`);
    }
}

// Component
interface Component {
    accept(visitor: Visitor): void;
}

// Concrete Components
class ConcreteComponentA implements Component {
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentA(this);
    }

    public exclusiveMethodOfConcreteComponentA(): string {
        return 'A';
    }
}

class ConcreteComponentB implements Component {
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentB(this);
    }

    public specialMethodOfConcreteComponentB(): string {
        return 'B';
    }
}

// Client
function runVisitorExample() {
    const components = [
        new ConcreteComponentA(),
        new ConcreteComponentB(),
    ];

    console.log('The client code works with all visitors via the base Visitor interface:');
    const visitor1 = new ConcreteVisitor1();
    for (const component of components) {
        component.accept(visitor1);
    }

    console.log('');

    console.log('It allows the same client code to work with different types of visitors:');
    const visitor2 = new ConcreteVisitor2();
    for (const component of components) {
        component.accept(visitor2);
    }
}

runVisitorExample();
