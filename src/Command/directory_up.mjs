import {AbstractCommand} from "./abstract_command.mjs";
import path from "path";

export class DirectoryUp extends AbstractCommand {
    async execute(dir, params = []) {
        dir.directory = path.resolve(dir.directory, '../');
    }

    type() {
        return 'up';
    }
}