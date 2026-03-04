/**
 * Proxy Design Pattern
 *
 * The Proxy pattern provides a surrogate or placeholder for another object to control access
 * to it. This is useful for implementing lazy loading, access control, logging, and so on.
 */

// Subject
interface Image {
  display(): void;
}

// RealSubject
class RealImage implements Image {
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.loadFromDisk(fileName);
  }

  public display(): void {
    console.log(`Displaying ${this.fileName}`);
  }

  private loadFromDisk(fileName: string): void {
    console.log(`Loading ${fileName}`);
  }
}

// Proxy
class ProxyImage implements Image {
  private realImage: RealImage | null = null;
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  public display(): void {
    if (this.realImage === null) {
      this.realImage = new RealImage(this.fileName);
    }
    this.realImage.display();
  }
}

// Example usage
function runProxyExample() {
  const image = new ProxyImage("test_10mb.jpg");

  // Image will be loaded from disk
  image.display();
  console.log("");

  // Image will not be loaded from disk
  image.display();
}

runProxyExample();
