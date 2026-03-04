 
/**
 * Prototype Design Pattern
 *
 * The Prototype pattern specifies the kinds of objects to create using a prototypical
 * instance, and creates new objects by copying this prototype. This is useful when the
 * cost of creating an object is more expensive than copying an existing one.
 */

// Prototype
interface Shape {
  clone(): Shape;
  draw(): void;
}

// ConcretePrototype
class Circle implements Shape {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  public clone(): Shape {
    return new Circle(this.radius);
  }

  public draw(): void {
    console.log(`Drawing a circle with radius ${this.radius}`);
  }
}

// ConcretePrototype
class Rectangle implements Shape {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public clone(): Shape {
    return new Rectangle(this.width, this.height);
  }

  public draw(): void {
    console.log(`Drawing a rectangle with width ${this.width} and height ${this.height}`);
  }
}

// Example usage
function runPrototypeExample() {
  const circle = new Circle(10);
  const clonedCircle = circle.clone();

  console.log("Original circle:");
  circle.draw();

  console.log("\nCloned circle:");
  clonedCircle.draw();

  const rectangle = new Rectangle(20, 30);
  const clonedRectangle = rectangle.clone();

  console.log("\nOriginal rectangle:");
  rectangle.draw();

  console.log("\nCloned rectangle:");
  clonedRectangle.draw();
}

runPrototypeExample();
