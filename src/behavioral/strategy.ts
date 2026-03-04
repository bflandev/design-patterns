/**
 * Strategy Design Pattern
 *
 * The Strategy pattern is a behavioral design pattern that enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use.
 */

// Strategy
interface Strategy {
    execute(a: number, b: number): number;
}

// Concrete Strategies
class ConcreteStrategyAdd implements Strategy {
    public execute(a: number, b: number): number {
        return a + b;
    }
}

class ConcreteStrategySubtract implements Strategy {
    public execute(a: number, b: number): number {
        return a - b;
    }
}

class ConcreteStrategyMultiply implements Strategy {
    public execute(a: number, b: number): number {
        return a * b;
    }
}

// Context
class Context {
    private strategy: Strategy;

    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    public executeStrategy(a: number, b: number): number {
        return this.strategy.execute(a, b);
    }
}

// Example usage
function runStrategyExample() {
    const context = new Context();

    context.setStrategy(new ConcreteStrategyAdd());
    console.log(`10 + 5 = ${context.executeStrategy(10, 5)}`);

    context.setStrategy(new ConcreteStrategySubtract());
    console.log(`10 - 5 = ${context.executeStrategy(10, 5)}`);

    context.setStrategy(new ConcreteStrategyMultiply());
    console.log(`10 * 5 = ${context.executeStrategy(10, 5)}`);
}

runStrategyExample();
