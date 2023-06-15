import {AbstractCommand} from "./abstract_command.mjs";

export class List extends AbstractCommand {
    async execute(dir) {
        console.log('this is dir: '+ dir);
    }

    type() {
        return 'ls';
    }
}