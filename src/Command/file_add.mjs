import {AbstractCommand} from "./abstract_command.mjs";
import fs from "fs/promises";
import path from "path";
import {InvalidInput} from "../Exception/invald_input.mjs";
import {fileExists, notBlankString} from "../Validator/validator.mjs";
import {OperationFailed} from "../Exception/operation_failed.mjs";

export class FileAdd extends AbstractCommand {
    async execute(dir, [fileName]) {
        if (!notBlankString(fileName)) {
            throw new InvalidInput();
        }

        try {
            const filePath = path.resolve(dir.directory, fileName);

            if (await fileExists(filePath)) {
                throw new OperationFailed();
            }

           const created = await fs.open(filePath, 'w');
           await created.close();
        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'add';
    }
}