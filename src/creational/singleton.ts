/**
 * Singleton Design Pattern
 *
 * The Singleton pattern ensures a class has only one instance, and provides a global
 * point of access to it. This is useful when exactly one object is needed to coordinate
 * actions across the system.
 */

// Singleton
class Database {
  private static instance: Database;

  private constructor() {
    // private constructor to prevent instantiation
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public query(sql: string): void {
    console.log(`Executing query: ${sql}`);
  }
}

// Example usage
function runSingletonExample() {
  const db1 = Database.getInstance();
  const db2 = Database.getInstance();

  if (db1 === db2) {
    console.log("Singleton works, both variables contain the same instance.");
  } else {
    console.log("Singleton failed, variables contain different instances.");
  }

  db1.query("SELECT * FROM users");
}

runSingletonExample();
