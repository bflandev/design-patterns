/**
 * Composite Design Pattern
 *
 * The Composite pattern composes objects into tree structures to represent part-whole
 * hierarchies. This lets clients treat individual objects and compositions of objects
 * uniformly.
 */

// Component
interface Graphic {
  move(x: number, y: number): void;
  draw(): void;
}

// Leaf
class Dot implements Graphic {
  constructor(protected x: number, protected y: number) {}

  public move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  public draw(): void {
    console.log(`Drawing a dot at (${this.x}, ${this.y})`);
  }
}

// Composite
class CompoundGraphic implements Graphic {
  private children: Graphic[] = [];

  public add(child: Graphic): void {
    this.children.push(child);
  }

  public remove(child: Graphic): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  public move(x: number, y: number): void {
    for (const child of this.children) {
      child.move(x, y);
    }
  }

  public draw(): void {
    for (const child of this.children) {
      child.draw();
    }
  }
}

// Example usage
function runCompositeExample() {
  const all = new CompoundGraphic();
  all.add(new Dot(1, 2));
  all.add(new Dot(3, 4));

  const group = new CompoundGraphic();
  group.add(new Dot(5, 6));
  group.add(new Dot(7, 8));

  all.add(group);

  all.draw();
  console.log("\nMoving all graphics by (10, 10)...\n");
  all.move(10, 10);
  all.draw();
}

runCompositeExample();
