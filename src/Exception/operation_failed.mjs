export class OperationFailed extends Error {
    constructor() {
        super(OperationFailed.message());
    }

    static message() {
        return 'Operation failed';
    }
}