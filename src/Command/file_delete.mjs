import {AbstractCommand} from "./abstract_command.mjs";
import fs from "fs/promises";
import path from "path";
import {InvalidInput} from "../Exception/invald_input.mjs";
import {OperationFailed} from "../Exception/operation_failed.mjs";
import {fileExists, notBlankString} from "../Validator/validator.mjs";

export class FileDelete extends AbstractCommand {
    async execute(dir, [file]) {
        if (!notBlankString(file)) {
            throw new InvalidInput();
        }

        try {
            const filePath = path.resolve(dir.directory, file);

            if (!await fileExists(filePath)) {
                throw new OperationFailed();
            }

            await fs.unlink(filePath);
        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'rm';
    }
}