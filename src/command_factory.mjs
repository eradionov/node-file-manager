import {List} from "./Command/list.mjs";

export class CommandFactory {
    constructor() {
        const list = new List();

        this._commands = new Map([
            [list.type(), list]
        ]);
    }

    getCommand(name) {
        return this._commands.get(name);
    }
}