const fsSync = require('fs');
const fsAsync = require('fs/promises');

class FileSystem {
    static create(filepath) {
        if(this.exists(filepath)) {
            this.delete(filepath);
        }
        fsSync.closeSync(fsSync.openSync(filepath, 'w'));
        return this.exists(filepath);
    }

    static delete(filepath) {
        if(this.exists(filepath)) {
            fsSync.unlinkSync(filepath);
        }
        return this.exists(filepath);
    }

    static exists(filepath) {
       return fsSync.existsSync(filepath);
    }

    static async write(filepath, line) {
        await fsAsync.appendFile(filepath, line);
    }

    static readUTF8(filepath) {
        if(this.exists(filepath)) {
            return fsSync.readFileSync(filepath, 'UTF-8');
        }
        return '';
    }
}

module.exports = FileSystem;