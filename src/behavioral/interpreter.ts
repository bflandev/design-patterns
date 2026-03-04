/**
 * Interpreter Design Pattern
 *
 * The Interpreter pattern is a behavioral design pattern that provides a way to evaluate language grammar or expression. This pattern is used in SQL parsing, symbol processing engine etc.
 */

// Abstract Expression
interface Expression {
    interpret(context: string): boolean;
}

// Terminal Expression
class TerminalExpression implements Expression {
    constructor(private data: string) {}

    public interpret(context: string): boolean {
        return context.includes(this.data);
    }
}

// Non-terminal Expressions
class OrExpression implements Expression {
    constructor(private expr1: Expression, private expr2: Expression) {}

    public interpret(context: string): boolean {
        return this.expr1.interpret(context) || this.expr2.interpret(context);
    }
}

class AndExpression implements Expression {
    constructor(private expr1: Expression, private expr2: Expression) {}

    public interpret(context: string): boolean {
        return this.expr1.interpret(context) && this.expr2.interpret(context);
    }
}

// Example usage
function runInterpreterExample() {
    const robert = new TerminalExpression("Robert");
    const john = new TerminalExpression("John");
    const isMale = new OrExpression(robert, john);

    const julie = new TerminalExpression("Julie");
    const married = new TerminalExpression("Married");
    const isMarriedWoman = new AndExpression(julie, married);

    console.log(`John is male? ${isMale.interpret("John")}`);
    console.log(`Julie is a married woman? ${isMarriedWoman.interpret("Married Julie")}`);
}

runInterpreterExample();
