/**
 * Flyweight Design Pattern
 *
 * The Flyweight pattern is a structural design pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.
 */

// Flyweight
class TreeType {
    constructor(public name: string, public color: string, public texture: string) {}

    public draw(canvas: any, x: number, y: number): void {
        console.log(`Drawing a ${this.name} tree with color ${this.color} and texture ${this.texture} at (${x}, ${y})`);
    }
}

// Flyweight Factory
class TreeFactory {
    private static treeTypes: { [key: string]: TreeType } = {};

    public static getTreeType(name: string, color: string, texture: string): TreeType {
        const key = `${name}_${color}_${texture}`;
        if (!(key in this.treeTypes)) {
            console.log(`Creating a new tree type: ${key}`);
            this.treeTypes[key] = new TreeType(name, color, texture);
        }
        return this.treeTypes[key];
    }
}

// Context
class Tree {
    constructor(private x: number, private y: number, private type: TreeType) {}

    public draw(canvas: any): void {
        this.type.draw(canvas, this.x, this.y);
    }
}

// Client
class Forest {
    private trees: Tree[] = [];

    public plantTree(x: number, y: number, name: string, color: string, texture: string): void {
        const type = TreeFactory.getTreeType(name, color, texture);
        const tree = new Tree(x, y, type);
        this.trees.push(tree);
    }

    public draw(canvas: any): void {
        for (const tree of this.trees) {
            tree.draw(canvas);
        }
    }
}

// Example usage
function runFlyweightExample() {
    const forest = new Forest();
    forest.plantTree(1, 2, "Pine", "Green", "Pine texture");
    forest.plantTree(3, 4, "Oak", "Green", "Oak texture");
    forest.plantTree(5, 6, "Pine", "Green", "Pine texture");
    forest.draw("canvas");
}

runFlyweightExample();
