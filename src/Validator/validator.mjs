import fs from "fs/promises";

export async function fileExists(filePath) {
    try {
        const stats = await fs.stat(filePath);

        return stats.isFile();
    } catch (error) {
        return false;
    }
}

export async function dirExists(dirPath) {
    try {
        const stats = await fs.stat(dirPath);

        return stats.isDirectory();
    } catch (error) {
        return false;
    }
}

export function notBlankString(name) {
    return typeof name === 'string' && name.trim().length !== 0;
}