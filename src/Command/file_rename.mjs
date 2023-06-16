import {AbstractCommand} from "./abstract_command.mjs";
import fs from "fs/promises";
import path from "path";
import {InvalidInput} from "../Exception/invald_input.mjs";
import {OperationFailed} from "../Exception/operation_failed.mjs";
import {fileExists, notBlankString} from "../Validator/validator.mjs";

export class FileRename extends AbstractCommand {
    async execute(dir, [fileFrom, fileTo]) {
        if (!notBlankString(fileFrom) || !notBlankString(fileTo)) {
            throw new InvalidInput();
        }

        try {
            const fileFromPath = path.resolve(dir.directory, fileFrom);
            const fileToPath = path.resolve(dir.directory, fileTo);

            if (!await fileExists(fileFromPath) || await fileExists(fileToPath)) {
                throw new OperationFailed();
            }

            await fs.rename(fileFromPath, fileToPath);
        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'rn';
    }
}