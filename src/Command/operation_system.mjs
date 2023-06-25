import {AbstractCommand} from "./abstract_command.mjs";
import fs from 'fs/promises';
import {DirectoryList} from "../DTO/directory_list.mjs";
import {OperationFailed} from "../Exception/operation_failed.mjs";
import {notBlankString} from "../Validator/validator.mjs";
import os from "os";

export class OperationSystem extends AbstractCommand {
    async execute(dir, [arg]) {
        try {
            switch (arg) {
                case '--EOL':
                    console.log(JSON.stringify(os.EOL));
                    break;
                case '--cpus':
                    const output = [];
                    const cpus = os.cpus();

                    os.cpus().forEach(cpu => {
                        output.push({
                            Model: cpu.model.trim(),
                           [`Clock Rate`]: cpu.speed/1000 + ' GHz'
                        });
                    });

                    console.log(`Overall Amount Of CPUS: ${cpus.length}`);
                    console.table(output);
                    break;
                case '--homedir':
                    console.log(os.homedir());
                    break;
                case '--username':
                    console.log(os.userInfo().username);
                    break;
                case '--architecture':
                    console.log(os.arch());
                    break;
                default:
                    throw new OperationFailed();
            }
        } catch (error) {
            throw new OperationFailed();
        }
    }

    type() {
        return 'os';
    }
}