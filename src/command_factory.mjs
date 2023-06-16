import {List} from "./Command/list.mjs";
import {DirectoryUp} from "./Command/directory_up.mjs";
import {FolderCD} from "./Command/folder_cd.mjs";

export class CommandFactory {
    constructor() {
        const list = new List();
        const up = new DirectoryUp();
        const cd = new FolderCD();

        this._commands = new Map([
            [list.type(), list],
            [up.type(), up],
            [cd.type(), cd],
        ]);
    }

    getCommand(name) {
        return this._commands.get(name);
    }
}