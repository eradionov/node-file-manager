import {AbstractCommand} from "./abstract_command.mjs";
import path from "path";

export class FolderCD extends AbstractCommand {
    async execute(dir, [toDir]) {
        console.log(toDir);
        if (typeof toDir !== 'string' || toDir.length === 0) {
            throw new InvalidInput();
        }

        dir.directory = path.resolve(dir.directory, toDir);
    }

    type() {
        return 'cd';
    }
}