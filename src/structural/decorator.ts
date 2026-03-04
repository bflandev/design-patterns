/**
 * Decorator Design Pattern
 *
 * The Decorator pattern attaches additional responsibilities to an object dynamically.
 * Decorators provide a flexible alternative to subclassing for extending functionality.
 */

// Component
interface Coffee {
  getCost(): number;
  getDescription(): string;
}

// ConcreteComponent
class SimpleCoffee implements Coffee {
  public getCost(): number {
    return 10;
  }

  public getDescription(): string {
    return "Simple coffee";
  }
}

// Decorator
abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  public getCost(): number {
    return this.coffee.getCost();
  }

  public getDescription(): string {
    return this.coffee.getDescription();
  }
}

// ConcreteDecorator
class MilkCoffee extends CoffeeDecorator {
  public getCost(): number {
    return super.getCost() + 2;
  }

  public getDescription(): string {
    return super.getDescription() + ", milk";
  }
}

// ConcreteDecorator
class SugarCoffee extends CoffeeDecorator {
  public getCost(): number {
    return super.getCost() + 1;
  }

  public getDescription(): string {
    return super.getDescription() + ", sugar";
  }
}

// Example usage
function runDecoratorExample() {
  let coffee: Coffee = new SimpleCoffee();
  console.log(`${coffee.getDescription()} costs ${coffee.getCost()}`);

  coffee = new MilkCoffee(coffee);
  console.log(`${coffee.getDescription()} costs ${coffee.getCost()}`);

  coffee = new SugarCoffee(coffee);
  console.log(`${coffee.getDescription()} costs ${coffee.getCost()}`);
}

runDecoratorExample();
