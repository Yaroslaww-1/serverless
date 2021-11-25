const archiver = require('archiver');
const fs = require("fs");
const { resolve } = require('path');

class ArchiveHelper {
  _archive;
  _outputStream;

  constructor({ outputPath }) {
    this._archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    this._outputStream = fs.createWriteStream(outputPath);
    this._archive.pipe(this._outputStream);
  }

  appendFileToArchive({ filePath, fileName }) {
    this._archive.file(filePath, { name: fileName });
    return this;
  }

  appendFilesToArchive(files) {
    files.forEach(f => this.appendFileToArchive(f));
    return this;
  }

  async finalize() {
    await new Promise((resolve, reject) => {
      this._outputStream.on('close', function() {
        resolve();
      });
      this._archive.finalize();
    })
  }
}

module.exports = {
  ArchiveHelper
}
