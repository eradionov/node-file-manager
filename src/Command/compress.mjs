import {AbstractCommand} from "./abstract_command.mjs";
import {fileExists, notBlankString} from "../Validator/validator.mjs";
import {InvalidInput} from "../Exception/invald_input.mjs";
import path from "path";
import {OperationFailed} from "../Exception/operation_failed.mjs";
import {createReadStream, createWriteStream} from "fs";
import zlib from "zlib";

export class Compress extends AbstractCommand {
    async execute(dir, [fileToCompress, archive]) {
        if (!notBlankString(fileToCompress) || !notBlankString(archive)) {
            throw new InvalidInput();
        }

        try {
            const resolvedFile = path.resolve(dir.directory, fileToCompress);
            const resolvedArchive = path.resolve(dir.directory, archive);

            if (!await fileExists(resolvedFile) || await fileExists(resolvedArchive)) {
                throw new OperationFailed();
            }

            const readStream = createReadStream(resolvedFile);
            const writeStream = createWriteStream(resolvedArchive);

            readStream.on('error', error => console.log(OperationFailed.message()));
            writeStream.on('error', error => console.log(OperationFailed.message()));

            readStream.pipe(zlib.createBrotliCompress({
                    params: {
                        [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
                        [zlib.constants.BROTLI_PARAM_QUALITY]: 4
                    }
                }))
                .pipe(writeStream);
        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'compress';
    }
}