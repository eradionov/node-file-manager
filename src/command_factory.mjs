import {List} from "./Command/list.mjs";
import {DirectoryUp} from "./Command/directory_up.mjs";
import {FolderCD} from "./Command/folder_cd.mjs";
import {FileCat} from "./Command/file_cat.mjs";
import {FileAdd} from "./Command/file_add.mjs";
import {FileRename} from "./Command/file_rename.mjs";
import {FileCp} from "./Command/file_cp.mjs";
import {FileMv} from "./Command/file_mv.mjs";
import {FileDelete} from "./Command/file_delete.mjs";
import {OperationSystem} from "./Command/operation_system.mjs";
import {Hash} from "./Command/hash.mjs";
import {Compress} from "./Command/compress.mjs";
import {Decompress} from "./Command/decompress.mjs";

export class CommandFactory {
    constructor() {
        const list = new List();
        const up = new DirectoryUp();
        const cd = new FolderCD();
        const cat = new FileCat();
        const add = new FileAdd();
        const rn = new FileRename();
        const cp = new FileCp();
        const mv = new FileMv();
        const rm = new FileDelete();
        const os = new OperationSystem();
        const hash = new Hash();
        const compress = new Compress();
        const decompress = new Decompress();

        this._commands = new Map([
            [list.type(), list],
            [up.type(), up],
            [cd.type(), cd],
            [cat.type(), cat],
            [add.type(), add],
            [rn.type(), rn],
            [cp.type(), cp],
            [mv.type(), mv],
            [rm.type(), rm],
            [os.type(), os],
            [hash.type(), hash],
            [compress.type(), compress],
            [decompress.type(), decompress],
        ]);
    }

    getCommand(name) {
        return this._commands.get(name);
    }
}