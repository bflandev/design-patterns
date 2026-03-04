 
/**
 * Builder Design Pattern
 *
 * The Builder pattern separates the construction of a complex object from its representation,
 * allowing the same construction process to create different representations. This is useful
 * when an object requires multiple steps to create, or when the creation process needs to be
 * customized.
 */

// Product
class Car {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Car parts: ${this.parts.join(', ')}`);
  }
}

// Builder
interface CarBuilder {
  reset(): void;
  setSeats(count: number): void;
  setEngine(engine: string): void;
  setTripComputer(): void;
  setGPS(): void;
}

// ConcreteBuilder
class SportsCarBuilder implements CarBuilder {
  private car: Car;

  constructor() {
    this.car = new Car();
  }

  public reset(): void {
    this.car = new Car();
  }

  public setSeats(count: number): void {
    this.car.parts.push(`${count} seats`);
  }

  public setEngine(engine: string): void {
    this.car.parts.push(`Engine: ${engine}`);
  }

  public setTripComputer(): void {
    this.car.parts.push("Trip computer");
  }

  public setGPS(): void {
    this.car.parts.push("GPS");
  }

  public getProduct(): Car {
    const result = this.car;
    this.reset();
    return result;
  }
}

// Director
class Director {
  private builder: CarBuilder;

  public setBuilder(builder: CarBuilder): void {
    this.builder = builder;
  }

  public constructSportsCar(): void {
    this.builder.reset();
    this.builder.setSeats(2);
    this.builder.setEngine("V8");
    this.builder.setTripComputer();
    this.builder.setGPS();
  }

  public constructSUV(): void {
    this.builder.reset();
    this.builder.setSeats(5);
    this.builder.setEngine("V6");
    this.builder.setGPS();
  }
}

// Example usage
function runBuilderExample() {
  const director = new Director();
  const builder = new SportsCarBuilder();
  director.setBuilder(builder);

  console.log("Building a sports car:");
  director.constructSportsCar();
  const sportsCar = builder.getProduct();
  sportsCar.listParts();

  console.log("\nBuilding an SUV:");
  director.constructSUV();
  const suv = builder.getProduct();
  suv.listParts();
}

runBuilderExample();
