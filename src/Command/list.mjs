import {AbstractCommand} from "./abstract_command.mjs";
import fs from 'fs/promises';
import {DirectoryList} from "../DTO/directory_list.mjs";

export class List extends AbstractCommand {
    async execute(dir, params = []) {
        let files = await fs.readdir(dir.directory, {withFileTypes: true});
        const convertedFiles = [];

        files = files
            .sort((file1, file2) => file1.name.localeCompare(file2.name))
            .sort((file1, file2) => {
                if (file1.isDirectory() && !file2.isDirectory()) {
                    return -1;
                }

                if (!file1.isDirectory() && file2.isDirectory()) {
                    return 1;
                }

                return 0
            });

        for (const item of files) {
            convertedFiles.push(new DirectoryList(item.name, item.isDirectory() ? 'directory' : 'file'));
        }

        console.table(convertedFiles);

    }

    type() {
        return 'ls';
    }
}