 
/**
 * Factory Method Design Pattern
 *
 * The Factory Method pattern defines an interface for creating an object, but lets subclasses
 * decide which class to instantiate. This allows a class to defer instantiation to subclasses.
 */

// Product
interface Transport {
  deliver(): void;
}

// ConcreteProductA
class Truck implements Transport {
  public deliver(): void {
    console.log("Delivering by land in a box.");
  }
}

// ConcreteProductB
class Ship implements Transport {
  public deliver(): void {
    console.log("Delivering by sea in a container.");
  }
}

// Creator
abstract class Logistics {
  public abstract createTransport(): Transport;

  public planDelivery(): void {
    const transport = this.createTransport();
    transport.deliver();
  }
}

// ConcreteCreatorA
class RoadLogistics extends Logistics {
  public createTransport(): Transport {
    return new Truck();
  }
}

// ConcreteCreatorB
class SeaLogistics extends Logistics {
  public createTransport(): Transport {
    return new Ship();
  }
}

// Example usage
function runFactoryMethodExample() {
  let logistics: Logistics;

  console.log("App: Launched with the RoadLogistics.");
  logistics = new RoadLogistics();
  logistics.planDelivery();

  console.log("\nApp: Launched with the SeaLogistics.");
  logistics = new SeaLogistics();
  logistics.planDelivery();
}

runFactoryMethodExample();
