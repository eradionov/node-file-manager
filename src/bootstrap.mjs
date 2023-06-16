import {parseArgs} from "./Utils/args_parser.mjs";
import {CommandFactory} from "./command_factory.mjs";
import {AbstractCommand} from "./Command/abstract_command.mjs";
import os from "os";
import {CurrentDirectory} from "./DTO/current_directory.mjs";
import {InvalidInput} from "./Exception/invald_input.mjs";
import {OperationFailed} from "./Exception/operation_failed.mjs";

export class Bootstrap {

    constructor(currentDir, reader) {
        this._dir = new CurrentDirectory(currentDir);
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
                    await this._reader.question(`You are currently in ${this._dir.directory}` + os.EOL)
                );

                const commandInstance = this._commandFactory.getCommand(command);

                if (!commandInstance instanceof AbstractCommand || commandInstance === undefined) {
                    throw new InvalidInput();
                }

               await commandInstance.execute(this._dir, params);
            } catch (error) {
                if (!error instanceof InvalidInput && !error instanceof OperationFailed) {
                    console.error(OperationFailed.message());

                    continue;
                }

                console.error(error.message);
            }
        }
    }
}