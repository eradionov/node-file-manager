import {AbstractCommand} from "./abstract_command.mjs";
import fs from "fs/promises";
import {createReadStream} from "fs";
import {fileExists, notBlankString} from "../Validator/validator.mjs";
import {OperationFailed} from "../Exception/operation_failed.mjs";
import {InvalidInput} from "../Exception/invald_input.mjs";

export class FileCat extends AbstractCommand {
    async execute(dir, [pathToFile]) {
        if (!notBlankString(pathToFile)) {
            throw new InvalidInput();
        }

        try {
            if (!await fileExists(pathToFile)) {
                throw new OperationFailed();
            }

            // TODO find out why message is not displayed
            createReadStream(pathToFile)
                .pipe(process.stdout);
        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'cat';
    }
}