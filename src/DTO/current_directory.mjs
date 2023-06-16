export class CurrentDirectory {
    constructor(directory) {
        this._dir = directory
    }

    get directory() {
        return this._dir;
    }

    set directory(directory) {
        this._dir = directory;
    }
}