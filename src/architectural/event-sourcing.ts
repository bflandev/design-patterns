/**
 * Event Sourcing Design Pattern
 *
 * Event Sourcing is an architectural pattern where all changes to an application state
 * are stored as a sequence of events. Instead of storing just the current state of the
 * data, the system stores the full series of events that led to that state.
 */

// --- Event Base ---

interface DomainEvent {
    type: string;
    timestamp: number;
    payload: any;
}

class UserCreatedEvent implements DomainEvent {
    readonly type = "USER_CREATED";
    readonly timestamp = Date.now();
    constructor(public payload: { id: string; name: string; email: string }) {}
}

class UserEmailUpdatedEvent implements DomainEvent {
    readonly type = "USER_EMAIL_UPDATED";
    readonly timestamp = Date.now();
    constructor(public payload: { id: string; newEmail: string }) {}
}

// --- Event Store ---

class EventStore {
    private events: Map<string, DomainEvent[]> = new Map();

    append(aggregateId: string, event: DomainEvent): void {
        if (!this.events.has(aggregateId)) {
            this.events.set(aggregateId, []);
        }
        this.events.get(aggregateId)!.push(event);
        console.log(`EVENT STORE: Appended ${event.type} for aggregate ${aggregateId}`);
    }

    getEvents(aggregateId: string): DomainEvent[] {
        return this.events.get(aggregateId) || [];
    }
}

// --- Aggregate ---

class UserAggregate {
    id: string;
    name: string;
    email: string;
    version: number = 0;

    constructor(id: string) {
        this.id = id;
    }

    // Rehydrates the aggregate state from a stream of events
    static fromEvents(events: DomainEvent[]): UserAggregate {
        const user = new UserAggregate(events[0].payload.id);
        events.forEach(event => user.apply(event));
        return user;
    }

    // Applies an event to change the state
    private apply(event: DomainEvent): void {
        switch (event.type) {
            case "USER_CREATED":
                this.name = event.payload.name;
                this.email = event.payload.email;
                break;
            case "USER_EMAIL_UPDATED":
                this.email = event.payload.newEmail;
                break;
        }
        this.version++;
    }
}

// --- Example Usage ---

export function runEventSourcingExample() {
    const eventStore = new EventStore();
    const userId = "user-123";

    console.log("--- Creating a new user ---");
    const createUserEvent = new UserCreatedEvent({ id: userId, name: "John Doe", email: "john.doe@example.com" });
    eventStore.append(userId, createUserEvent);

    console.log("\n--- Updating user email ---");
    const updateUserEmailEvent = new UserEmailUpdatedEvent({ id: userId, newEmail: "john.doe.new@example.com" });
    eventStore.append(userId, updateUserEmailEvent);

    console.log("\n--- Reconstructing user state from events ---");
    const userEvents = eventStore.getEvents(userId);
    const user = UserAggregate.fromEvents(userEvents);

    console.log("\nRehydrated User State:");
    console.log(user);
}

runEventSourcingExample();
