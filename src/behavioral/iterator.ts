/**
 * Iterator Design Pattern
 *
 * The Iterator pattern provides a way to access the elements of an aggregate object
 * sequentially without exposing its underlying representation.
 */

// Aggregate
interface Aggregator {
    createIterator(): Iterator<string>;
}

// Iterator
interface Iterator<T> {
    current(): T;
    next(): T;
    key(): number;
    valid(): boolean;
    rewind(): void;
}

// Concrete Iterator
class AlphabeticalOrderIterator implements Iterator<string> {
    private collection: WordsCollection;
    private position: number = 0;
    private reverse: boolean = false;

    constructor(collection: WordsCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    public rewind() {
        this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
    }

    public current(): string {
        return this.collection.getItems()[this.position];
    }

    public key(): number {
        return this.position;
    }

    public next(): string {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}

// Concrete Aggregate
class WordsCollection implements Aggregator {
    private items: string[] = [];

    public getItems(): string[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: string): void {
        this.items.push(item);
    }

    public createIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this);
    }

    public getReverseIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this, true);
    }
}

// Example usage
function runIteratorExample() {
    const collection = new WordsCollection();
    collection.addItem("First");
    collection.addItem("Second");
    collection.addItem("Third");

    const iterator = collection.createIterator();

    console.log("Straight traversal:");
    while (iterator.valid()) {
        console.log(iterator.next());
    }

    console.log("");

    const reverseIterator = collection.getReverseIterator();
    console.log("Reverse traversal:");
    while (reverseIterator.valid()) {
        console.log(reverseIterator.next());
    }
}

runIteratorExample();
