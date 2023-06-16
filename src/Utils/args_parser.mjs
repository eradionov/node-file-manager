export function parseArgByName(argName) {
    const re = new RegExp(`--${argName}`);

    const args = process.argv
        .filter(
            arg => true === re.test(arg)
        );

    if (args.length !== 1) {
        return null;
    }


    return args[0].split('=')[1] ?? null;
}

export function parseArgs(args) {
    return args.toString()
        .trim()
        .replace(/\s{2,}/, '')
        .split(' ');
}