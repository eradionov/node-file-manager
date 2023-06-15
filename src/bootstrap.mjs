import {parseArgs} from "./Utils/args_parser.mjs";
import {CommandFactory} from "./command_factory.mjs";
import {AbstractCommand} from "./Command/abstract_command.mjs";
import os from "os";

export class Bootstrap {

    constructor(currentDir, reader) {
        this._dir = currentDir;
        this._reader = reader;
        this._commandFactory = new CommandFactory();
    }
    static bootstrap(currentDir, reader) {
        return new Bootstrap(currentDir, reader);
    }

    async process() {
        while (true) {
            try {
                const [command, ...params] = parseArgs(
                    await this._reader.question(`You are currently in ${this._dir}` + os.EOL)
                );

                const commandInstance = this._commandFactory.getCommand(command);

                if(!commandInstance instanceof AbstractCommand) {
                    throw new Error('Operation failed')
                }

                await commandInstance.execute(params);
            } catch (error) {
                console.error(error);
            }
        }

        this._reader.close();
    }
}