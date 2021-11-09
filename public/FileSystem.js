const fsSync = require('fs');
const fsAsync = require('fs/promises');

class FileSystem {
    static create(filepath) {
        fsSync.closeSync(fsSync.openSync(filepath, 'w'));
    }

    static delete(filepath) {
        fsSync.unlinkSync(filepath);
    }

    static exists(filepath) {
       return fsSync.existsSync(filepath);
    }

    static async write(filepath, line) {
        await fsAsync.appendFile(filepath, line);
    }

    static readUTF8(filepath) {
        return fsSync.readFileSync(filepath, 'UTF-8');
    }
}

module.exports = FileSystem;