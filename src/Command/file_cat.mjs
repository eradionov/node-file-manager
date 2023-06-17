import {AbstractCommand} from "./abstract_command.mjs";
import fs from "fs/promises";
import {createReadStream} from "fs";
import {fileExists, notBlankString} from "../Validator/validator.mjs";
import {OperationFailed} from "../Exception/operation_failed.mjs";
import {InvalidInput} from "../Exception/invald_input.mjs";
import path from "path";

export class FileCat extends AbstractCommand {
    async execute(dir, [pathToFile]) {
        if (!notBlankString(pathToFile)) {
            throw new InvalidInput();
        }

        try {
            const resolvedFile = path.resolve(dir.directory, pathToFile);

            if (!await fileExists(resolvedFile)) {
                throw new OperationFailed();
            }

            createReadStream(resolvedFile)
                .pipe(process.stdout);
        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'cat';
    }
}