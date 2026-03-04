/**
 * Saga Design Pattern
 *
 * The Saga pattern is a way to manage long-running transactions and data consistency
 * across multiple microservices. It's a sequence of local transactions where each
 * transaction updates data in a single service and publishes an event. If a local
 * transaction fails, the saga executes a series of compensating transactions to undo
 * the preceding transactions.
 */

// --- Saga Steps and Commands ---

interface Command {
    execute(): Promise<boolean>;
    compensate(): Promise<void>;
}

class CreateOrderCommand implements Command {
    constructor(private orderId: string) {}
    async execute(): Promise<boolean> {
        console.log(`SAGA: Creating order ${this.orderId}...`);
        // Simulate a successful operation
        return true;
    }
    async compensate(): Promise<void> {
        console.log(`SAGA: Compensating: Deleting order ${this.orderId}...`);
    }
}

class ProcessPaymentCommand implements Command {
    constructor(private orderId: string) {}
    async execute(): Promise<boolean> {
        console.log(`SAGA: Processing payment for order ${this.orderId}...`);
        // Simulate a failure
        console.log("SAGA: Payment failed!");
        return false;
    }
    async compensate(): Promise<void> {
        console.log(`SAGA: Compensating: Refunding payment for order ${this.orderId}...`);
    }
}

class ShipOrderCommand implements Command {
    constructor(private orderId: string) {}
    async execute(): Promise<boolean> {
        console.log(`SAGA: Shipping order ${this.orderId}...`);
        return true;
    }
    async compensate(): Promise<void> {
        console.log(`SAGA: Compensating: Stopping shipment for order ${this.orderId}...`);
    }
}

// --- Saga Orchestrator ---

class OrderSaga {
    private steps: Command[] = [];
    private completedSteps: Command[] = [];

    public addStep(command: Command): void {
        this.steps.push(command);
    }

    public async execute(): Promise<void> {
        for (const step of this.steps) {
            const success = await step.execute();
            if (success) {
                this.completedSteps.push(step);
            } else {
                console.log("SAGA: Execution failed. Starting compensation...");
                await this.compensate();
                return;
            }
        }
        console.log("SAGA: Execution completed successfully.");
    }

    private async compensate(): Promise<void> {
        for (const step of this.completedSteps.reverse()) {
            await step.compensate();
        }
    }
}

// --- Example Usage ---

export async function runSagaExample() {
    const orderId = "order-456";
    const saga = new OrderSaga();

    saga.addStep(new CreateOrderCommand(orderId));
    saga.addStep(new ProcessPaymentCommand(orderId)); // This step will fail
    saga.addStep(new ShipOrderCommand(orderId));

    await saga.execute();
}

runSagaExample();
