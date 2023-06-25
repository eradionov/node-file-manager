export class DirectoryList {
    constructor(name, type) {
        this.Name = name;
        this.Type = type;
    }

    get name() {
        return this.Name;
    }

    get type() {
        return this.Type;
    }
}