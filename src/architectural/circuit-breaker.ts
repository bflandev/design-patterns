/**
 * Circuit Breaker Design Pattern
 *
 * The Circuit Breaker pattern is used to prevent a network or service failure from
 * cascading to other services. It acts as a proxy for operations that might fail,
 * monitoring for failures and tripping to prevent further calls when a threshold is met.
 */

// --- The Service that can fail ---

class UnreliableService {
    private failureCount = 0;

    public async call(): Promise<string> {
        this.failureCount++;
        if (this.failureCount < 3) {
            console.log("SERVICE: Call fails.");
            throw new Error("Service failure");
        }
        console.log("SERVICE: Call succeeds.");
        return "Success";
    }
}

// --- The Circuit Breaker ---

type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

class CircuitBreaker {
    private state: CircuitState = "CLOSED";
    private failureCount = 0;
    private lastFailureTime: number | null = null;

    constructor(
        private service: UnreliableService,
        private failureThreshold: number,
        private resetTimeout: number // in ms
    ) {}

    public async call(): Promise<string> {
        switch (this.state) {
            case "CLOSED":
                try {
                    const result = await this.service.call();
                    this.reset();
                    return result;
                } catch (error) {
                    this.recordFailure();
                    if (this.failureCount >= this.failureThreshold) {
                        this.trip();
                    }
                    throw error;
                }
            case "OPEN":
                if (Date.now() - this.lastFailureTime! > this.resetTimeout) {
                    this.halfOpen();
                    return this.call();
                }
                throw new Error("Circuit is open. Service is unavailable.");
            case "HALF_OPEN":
                try {
                    const result = await this.service.call();
                    this.reset();
                    return result;
                } catch (error) {
                    this.trip();
                    throw error;
                }
        }
    }

    private reset(): void {
        console.log("CIRCUIT BREAKER: Resetting to CLOSED state.");
        this.state = "CLOSED";
        this.failureCount = 0;
        this.lastFailureTime = null;
    }

    private recordFailure(): void {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        console.log(`CIRCUIT BREAKER: Recorded failure. Count: ${this.failureCount}`);
    }

    private trip(): void {
        console.log("CIRCUIT BREAKER: Tripping to OPEN state.");
        this.state = "OPEN";
    }

    private halfOpen(): void {
        console.log("CIRCUIT BREAKER: Moving to HALF_OPEN state.");
        this.state = "HALF_OPEN";
    }
}

// --- Example Usage ---

export async function runCircuitBreakerExample() {
    const service = new UnreliableService();
    const breaker = new CircuitBreaker(service, 2, 2000);

    for (let i = 0; i < 10; i++) {
        try {
            console.log(`\nAttempt ${i + 1}:`);
            const result = await breaker.call();
            console.log(`Result: ${result}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
        await new Promise(res => setTimeout(res, 500));
    }
}

runCircuitBreakerExample();
