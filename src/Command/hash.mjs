import {AbstractCommand} from "./abstract_command.mjs";
import {fileExists, notBlankString} from "../Validator/validator.mjs";
import {InvalidInput} from "../Exception/invald_input.mjs";
import path from "path";
import {OperationFailed} from "../Exception/operation_failed.mjs";
import {createReadStream} from "fs";
import {createHash} from 'node:crypto';
export class Hash extends AbstractCommand {
    async execute(dir, [file]) {
        if (!notBlankString(file)) {
            throw new InvalidInput();
        }

        try {
            const resolvedFile = path.resolve(dir.directory, file);

            if (!await fileExists(resolvedFile)) {
                throw new OperationFailed();
            }

            const hash = createHash('sha256');
            const readStream = createReadStream(resolvedFile);

            readStream.pipe(hash)
                .setEncoding('hex')
                .pipe(process.stdout);
        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'hash';
    }
}