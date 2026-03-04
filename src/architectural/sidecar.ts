/**
 * Sidecar Design Pattern
 *
 * The Sidecar pattern consists of a main application and a helper container (the sidecar)
 * that is deployed alongside it. The sidecar provides supporting features like logging,
 * monitoring, configuration, and networking services, allowing the main application to
 * remain focused on its core business logic.
 */

// --- The Sidecar ---

class LoggingSidecar {
    log(message: string): void {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] SIDECAR_LOG: ${message}`);
    }
}

// --- The Main Application ---

class MainApplication {
    private sidecar: LoggingSidecar;

    constructor(sidecar: LoggingSidecar) {
        this.sidecar = sidecar;
    }

    public doBusinessLogic(): void {
        this.sidecar.log("Starting business logic...");
        console.log("MAIN_APP: Executing core business logic.");
        // ... business logic happens here ...
        this.sidecar.log("Business logic finished.");
    }

    public performAnotherTask(): void {
        this.sidecar.log("Starting another task...");
        console.log("MAIN_APP: Performing another important task.");
        // ... another task happens here ...
        this.sidecar.log("Another task finished.");
    }
}

// --- Example Usage ---

export function runSidecarExample() {
    // In a real-world scenario (e.g., Kubernetes), the sidecar would be a separate
    // container in the same pod, sharing network and volume resources.
    // Here, we simulate it by creating two separate objects.

    const sidecar = new LoggingSidecar();
    const app = new MainApplication(sidecar);

    app.doBusinessLogic();
    console.log("\n");
    app.performAnotherTask();
}

runSidecarExample();
