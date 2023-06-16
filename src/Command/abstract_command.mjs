export class AbstractCommand {
    async execute(dir, params) {
        throw new Error('Implementation of this method should be done in child class');
    }

    type() {
        throw new Error('Implementation of this method should be done in child class');
    }
}