/**
 * CQRS (Command Query Responsibility Segregation) Design Pattern
 *
 * CQRS is an architectural pattern that separates the model for reading data (Queries)
 * from the model for writing data (Commands). This separation allows for independent
 * scaling, optimization, and evolution of the read and write sides.
 */

// In-memory data store for demonstration purposes
const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
];

// --- Command Side ---

interface Command {
    type: string;
    payload: any;
}

class CreateUserCommand implements Command {
    readonly type = "CREATE_USER";
    constructor(public payload: { id: number; name: string; email: string }) {}
}

class UpdateUserEmailCommand implements Command {
    readonly type = "UPDATE_USER_EMAIL";
    constructor(public payload: { id: number; newEmail: string }) {}
}

class CommandHandler {
    handle(command: Command): void {
        switch (command.type) {
            case "CREATE_USER":
                const user = command.payload;
                console.log(`COMMAND: Creating user ${user.name}...`);
                users.push(user);
                break;
            case "UPDATE_USER_EMAIL":
                const { id, newEmail } = command.payload;
                const userToUpdate = users.find(u => u.id === id);
                if (userToUpdate) {
                    console.log(`COMMAND: Updating email for user ${id} to ${newEmail}...`);
                    userToUpdate.email = newEmail;
                }
                break;
        }
    }
}

// --- Query Side ---

interface Query {
    type: string;
    payload?: any;
}

class GetUserByIdQuery implements Query {
    readonly type = "GET_USER_BY_ID";
    constructor(public payload: { id: number }) {}
}

class GetAllUsersQuery implements Query {
    readonly type = "GET_ALL_USERS";
}

class QueryHandler {
    handle(query: Query): any {
        switch (query.type) {
            case "GET_USER_BY_ID":
                const { id } = query.payload;
                console.log(`QUERY: Getting user by id ${id}...`);
                return users.find(u => u.id === id);
            case "GET_ALL_USERS":
                console.log(`QUERY: Getting all users...`);
                return users;
        }
    }
}

// --- Example Usage ---

export function runCqrsExample() {
    const commandHandler = new CommandHandler();
    const queryHandler = new QueryHandler();

    console.log("--- Initial State ---");
    console.log(queryHandler.handle(new GetAllUsersQuery()));

    console.log("\n--- Executing Commands ---");
    commandHandler.handle(new CreateUserCommand({ id: 3, name: "Peter Jones", email: "peter.jones@example.com" }));
    commandHandler.handle(new UpdateUserEmailCommand({ id: 1, newEmail: "john.doe.new@example.com" }));

    console.log("\n--- Final State ---");
    console.log(queryHandler.handle(new GetAllUsersQuery()));

    console.log("\n--- Specific Query ---");
    console.log(queryHandler.handle(new GetUserByIdQuery({ id: 1 })));
}

runCqrsExample();
