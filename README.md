# Design Patterns in TypeScript

This repository contains all 23 Gang of Four (GoF) design patterns implemented in TypeScript. Each pattern has a dedicated file with a clear explanation and a simple example.

## Implemented Design Patterns

### Creational Patterns

- **Abstract Factory**: Provides an interface for creating families of related or dependent objects without specifying their concrete classes.
- **Builder**: Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.
- **Factory Method**: Defines an interface for creating an object, but lets subclasses decide which class to instantiate.
- **Prototype**: Specifies the kinds of objects to create using a prototypical instance, and creates new objects by copying this prototype.
- **Singleton**: Ensures a class has only one instance, and provides a global point of access to it.

### Structural Patterns

- **Adapter**: Allows the interface of an existing class to be used as another interface.
- **Bridge**: Decouples an abstraction from its implementation so that the two can vary independently.
- **Composite**: Composes objects into tree structures to represent part-whole hierarchies.
- **Decorator**: Attaches additional responsibilities to an object dynamically.
- **Facade**: Provides a simplified interface to a library, a framework, or any other complex set of classes.
- **Flyweight**: Lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects.
- **Proxy**: Provides a surrogate or placeholder for another object to control access to it.

### Behavioral Patterns

- **Chain of Responsibility**: Creates a chain of receiver objects for a request.
- **Command**: Turns a request into a stand-alone object that contains all information about the request.
- **Interpreter**: Provides a way to evaluate language grammar or expression.
- **Iterator**: Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
- **Mediator**: Defines an object that encapsulates how a set of objects interact.
- **Memento**: Provides the ability to restore an object to its previous state.
- **Observer**: Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
- **State**: Allows an object to alter its behavior when its internal state changes.
- **Strategy**: Enables selecting an algorithm at runtime.
- **Template Method**: Defines the skeleton of an algorithm in a superclass but lets subclasses override specific steps of the algorithm without changing its structure.
- **Visitor**: Lets you separate algorithms from the objects on which they operate.

## How to Run

To run any of the examples, you can use `ts-node`:

```bash
# Install dependencies
npm install

# Run a specific pattern
./node_modules/.bin/ts-node src/creational/abstract-factory.ts
```
