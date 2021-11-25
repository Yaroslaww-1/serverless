const archiver = require('archiver');
const fs = require("fs");

class ArchiveHelper {
  _archive;

  constructor({ outputPath }) {
    this._archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    const outputStream = fs.createWriteStream(outputPath);
    this._archive.pipe(outputStream);
  }

  appendFileToArchive({ filePath, fileName }) {
    this._archive.file(filePath, { name: fileName });
    return this;
  }

  appendFilesToArchive(files) {
    files.forEach(f => this.appendFileToArchive(f));
    return this;
  }

  finalize() {
    this._archive.finalize();
  }
}

module.exports = {
  ArchiveHelper
}
