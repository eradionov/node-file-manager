import {AbstractCommand} from "./abstract_command.mjs";

export class Exit extends AbstractCommand {
    async execute(dir, []) {
        process.exit();
    }

    type() {
        return '.exit';
    }
}