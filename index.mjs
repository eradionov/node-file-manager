
import os from "os";
import { parseArgByName} from "./src/Utils/args_parser.mjs";
import readline from "readline/promises";
import {Bootstrap} from "./src/bootstrap.mjs";
import {OperationFailed} from "./src/Exception/operation_failed.mjs";

const execute = async () => {
    let username = parseArgByName('username');

    if (null === username || 0 === username.trim().length) {
        username = 'Noname';
    }

    console.log(`Welcome to the File Manager, ${username}!`);

    process.on('exit', () => console.log(`Thank you for using File Manager, ${username}, goodbye!`));

    const input = process.stdin;
    const output = process.stdout;

    try {
        const rl = readline.createInterface({input: input, output: output});
        rl.on('error', error => console.log(OperationFailed.message()));

        const bootstrap = Bootstrap.bootstrap(
            os.homedir(),
            rl
        );

        await bootstrap.process();
    } catch (error) {
        console.error(error);
    }
};


await execute();