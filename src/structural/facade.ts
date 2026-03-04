/**
 * Facade Design Pattern
 *
 * The Facade pattern provides a simplified interface to a library, a framework, or any
 * other complex set of classes. This is useful for providing a simple, easy-to-understand
 * interface over a large and sophisticated body of code.
 */

// Subsystem parts
class CPU {
  public freeze(): void {
    console.log("CPU: Freezing...");
  }
  public jump(position: number): void {
    console.log(`CPU: Jumping to ${position}...`);
  }
  public execute(): void {
    console.log("CPU: Executing...");
  }
}

class Memory {
  public load(position: number, data: string): void {
    console.log(`Memory: Loading data '${data}' to position ${position}...`);
  }
}

class HardDrive {
  public read(lba: number, size: number): string {
    console.log(`HardDrive: Reading ${size} sectors from LBA ${lba}...`);
    return "some_data";
  }
}

// Facade
class ComputerFacade {
  private cpu: CPU;
  private memory: Memory;
  private hardDrive: HardDrive;

  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  public start(): void {
    console.log("Computer: Starting...");
    this.cpu.freeze();
    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();
    console.log("Computer: Started.");
  }
}

// Example usage
function runFacadeExample() {
  const computer = new ComputerFacade();
  computer.start();
}

runFacadeExample();
