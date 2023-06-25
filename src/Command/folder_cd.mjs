import {AbstractCommand} from "./abstract_command.mjs";
import path from "path";
import fs from "fs/promises";
import {InvalidInput} from "../Exception/invald_input.mjs";
import {dirExists, notBlankString} from "../Validator/validator.mjs";
import {OperationFailed} from "../Exception/operation_failed.mjs";

export class FolderCD extends AbstractCommand {
    async execute(dir, [toDir]) {
        if (!notBlankString(toDir)) {
            throw new InvalidInput();
        }

        try {
            const currDir = path.resolve(dir.directory, toDir);

            if (!await dirExists(currDir)) {
                throw new OperationFailed();
            }

            dir.directory = currDir;
        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'cd';
    }
}