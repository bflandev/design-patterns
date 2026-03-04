/**
 * Bridge Design Pattern
 *
 * The Bridge pattern decouples an abstraction from its implementation so that the two can
 * vary independently. This is useful when you have a class that can have different
 * variations, and you want to avoid a proliferation of subclasses.
 */

// Abstraction
interface Shape {
  draw(): void;
}

// RefinedAbstraction
class Circle implements Shape {
  private color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  public draw(): void {
    console.log(`Drawing a circle with ${this.color.fill()} color.`);
  }
}

// RefinedAbstraction
class Square implements Shape {
  private color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  public draw(): void {
    console.log(`Drawing a square with ${this.color.fill()} color.`);
  }
}

// Implementor
interface Color {
  fill(): string;
}

// ConcreteImplementor
class Red implements Color {
  public fill(): string {
    return "red";
  }
}

// ConcreteImplementor
class Blue implements Color {
  public fill(): string {
    return "blue";
  }
}

// Example usage
function runBridgeExample() {
  const redCircle = new Circle(new Red());
  const blueSquare = new Square(new Blue());

  redCircle.draw();
  blueSquare.draw();
}

runBridgeExample();
