import {AbstractCommand} from "./abstract_command.mjs";
import fs from "fs/promises";
import path from "path";
import {InvalidInput} from "../Exception/invald_input.mjs";
import {OperationFailed} from "../Exception/operation_failed.mjs";
import {fileExists, notBlankString} from "../Validator/validator.mjs";
import * as constants from "constants";
import {createReadStream, createWriteStream} from "fs";

export class FileCp extends AbstractCommand {
    async execute(dir, [fileFrom, fileTo]) {
        if (!notBlankString(fileFrom) || !notBlankString(fileTo)) {
            throw new InvalidInput();
        }

        try {
            const fileFromPath = path.resolve(dir.directory, fileFrom);
            const fileToPath = path.resolve(dir.directory, fileTo);

            if (!await fileExists(fileFromPath) || await  fileExists(fileToPath)) {
                throw new OperationFailed();
            }

            const readStream = createReadStream(fileFromPath);
            const writeStream = createWriteStream(fileTo);

            await readStream.pipe(writeStream);
        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'cp';
    }
}