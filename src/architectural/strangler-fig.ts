/**
 * Strangler Fig Design Pattern
 *
 * The Strangler Fig pattern is a method for incrementally migrating a legacy system to a
 * new one. A facade (the "strangler") is placed in front of the legacy system, and new
 * functionality is built in a new, modern system. The strangler facade intercepts
 * requests, routing them to either the legacy system or the new system as features are
 * migrated. Over time, the legacy system is "strangled" and can be decommissioned.
 */

// --- The Legacy System ---

class LegacyUserSystem {
    public getUser(id: number): { id: number; name: string; legacy: boolean } {
        console.log(`LEGACY: Fetching user ${id}`);
        return { id, name: `Legacy User ${id}`, legacy: true };
    }

    public createUser(name: string): { id: number; name: string; legacy: boolean } {
        console.log(`LEGACY: Creating user ${name}`);
        const id = Math.floor(Math.random() * 1000);
        return { id, name, legacy: true };
    }
}

// --- The New Modern System ---

class ModernUserSystem {
    public getUser(id: number): { id: number; name: string; email: string; legacy: boolean } {
        console.log(`MODERN: Fetching user ${id}`);
        return { id, name: `Modern User ${id}`, email: `user${id}@example.com`, legacy: false };
    }

    // Note: The modern system does not have a createUser method yet.
}

// --- The Strangler Facade ---

class StranglerFacade {
    private legacySystem = new LegacyUserSystem();
    private modernSystem = new ModernUserSystem();

    // A simple feature flag to control routing
    private migratedUserIds = new Set<number>([2]);

    public getUser(id: number): any {
        if (this.migratedUserIds.has(id)) {
            console.log("FACADE: Routing getUser to MODERN system.");
            return this.modernSystem.getUser(id);
        } else {
            console.log("FACADE: Routing getUser to LEGACY system.");
            return this.legacySystem.getUser(id);
        }
    }

    public createUser(name: string): any {
        // The createUser feature has not been migrated yet, so it always goes to legacy.
        console.log("FACADE: Routing createUser to LEGACY system.");
        return this.legacySystem.createUser(name);
    }
}

// --- Example Usage ---

export function runStranglerFigExample() {
    const facade = new StranglerFacade();

    console.log("--- Calling for a non-migrated user ---");
    const user1 = facade.getUser(1);
    console.log(user1);

    console.log("\n--- Calling for a migrated user ---");
    const user2 = facade.getUser(2);
    console.log(user2);

    console.log("\n--- Calling a non-migrated feature ---");
    const newUser = facade.createUser("Newbie");
    console.log(newUser);
}

runStranglerFigExample();
