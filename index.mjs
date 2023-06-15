
import os from "os";
import { parseArgByName} from "./src/Utils/args_parser.mjs";
import readline from "readline/promises";
import {Bootstrap} from "./src/bootstrap.mjs";

const execute = async () => {
    let username = parseArgByName('username');

    if (null === username || 0 === username.trim().length) {
        username = 'Noname';
    }

    console.log(`Welcome to the File Manager, ${username}!`);

    const input = process.stdin;
    const output = process.stdout;

    try {
        process.on('exit', () => console.log(`Thank you for using File Manager, ${username}, goodbye!`));

        const bootstrap = Bootstrap.bootstrap(
            os.homedir(),
            readline.createInterface({input: input, output: output})
        );

        await bootstrap.process();
    } catch (error) {
        console.error(error);
    }
};


await execute();