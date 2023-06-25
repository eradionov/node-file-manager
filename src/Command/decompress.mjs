import {AbstractCommand} from "./abstract_command.mjs";
import {fileExists, notBlankString} from "../Validator/validator.mjs";
import {InvalidInput} from "../Exception/invald_input.mjs";
import path from "path";
import {OperationFailed} from "../Exception/operation_failed.mjs";
import {createReadStream, createWriteStream} from "fs";
import zlib from "zlib";

export class Decompress extends AbstractCommand {
    async execute(dir, [archive, decompressTo]) {
        if (!notBlankString(archive) || !notBlankString(decompressTo)) {
            throw new InvalidInput();
        }

        try {
            const resolvedArchive = path.resolve(dir.directory, archive);
            const resolvedFile = path.resolve(dir.directory, decompressTo);

            if (!await fileExists(resolvedArchive) || await fileExists(resolvedFile)) {
                throw new OperationFailed();
            }

            const readStream = createReadStream(resolvedArchive);
            const writeStream = createWriteStream(resolvedFile);

            readStream.on('error', error => console.log(OperationFailed.message()));
            writeStream.on('error', error => console.log(OperationFailed.message()));

            readStream.pipe(zlib.createBrotliDecompress())
                .pipe(writeStream);
        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'decompress';
    }
}