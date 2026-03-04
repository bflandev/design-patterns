
/**
 * Abstract Factory Design Pattern
 *
 * The Abstract Factory pattern provides an interface for creating families of related or
 * dependent objects without specifying their concrete classes. This pattern is useful when
 * a system needs to be independent of how its products are created, composed, and represented.
 */

// AbstractProductA
interface Button {
  paint(): void;
}

// ConcreteProductA1
class WinButton implements Button {
  public paint(): void {
    console.log("Rendering a button in Windows style.");
  }
}

// ConcreteProductA2
class MacButton implements Button {
  public paint(): void {
    console.log("Rendering a button in macOS style.");
  }
}

// AbstractProductB
interface Checkbox {
  paint(): void;
}

// ConcreteProductB1
class WinCheckbox implements Checkbox {
  public paint(): void {
    console.log("Rendering a checkbox in Windows style.");
  }
}

// ConcreteProductB2
class MacCheckbox implements Checkbox {
  public paint(): void {
    console.log("Rendering a checkbox in macOS style.");
  }
}

// AbstractFactory
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// ConcreteFactory1
class WinFactory implements GUIFactory {
  public createButton(): Button {
    return new WinButton();
  }

  public createCheckbox(): Checkbox {
    return new WinCheckbox();
  }
}

// ConcreteFactory2
class MacFactory implements GUIFactory {
  public createButton(): Button {
    return new MacButton();
  }

  public createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// Client
class Application {
  private factory: GUIFactory;
  private button: Button;
  private checkbox: Checkbox;

  constructor(factory: GUIFactory) {
    this.factory = factory;
    this.button = this.factory.createButton();
    this.checkbox = this.factory.createCheckbox();
  }

  public paint(): void {
    this.button.paint();
    this.checkbox.paint();
  }
}

// Example usage
function runAbstractFactoryExample() {
  const os = "Windows"; // or "macOS"
  let factory: GUIFactory;

  if (os === "Windows") {
    factory = new WinFactory();
  } else {
    factory = new MacFactory();
  }

  const app = new Application(factory);
  app.paint();
}

runAbstractFactoryExample();
