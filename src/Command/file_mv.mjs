import {AbstractCommand} from "./abstract_command.mjs";
import path from "path";
import {InvalidInput} from "../Exception/invald_input.mjs";
import {OperationFailed} from "../Exception/operation_failed.mjs";
import {fileExists, notBlankString} from "../Validator/validator.mjs";
import {createReadStream, createWriteStream} from "fs";
import fs from "fs/promises";

export class FileMv extends AbstractCommand {
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

            const readStream = createReadStream(fileFromPath);
            const writeStream = createWriteStream(fileToPath);

            readStream.on('error', error => console.log(OperationFailed.message()));
            writeStream.on('error', error => console.log(OperationFailed.message()));

            readStream.pipe(writeStream);

            writeStream.once('close', () => {
                    readStream.destroy();

                    (async function() {
                        try {
                            await fs.unlink(fileFromPath);
                        } catch (error) {
                            console.log(OperationFailed.message());
                        }
                    })();
                })

        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'mv';
    }
}