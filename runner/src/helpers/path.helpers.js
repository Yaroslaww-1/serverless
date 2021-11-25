const path = require('path');
var fs = require('fs');

class PathHelperClass {
  getRootFolder() {
    return path.join(__dirname, '..', '..');
  }

  appendToPath(basePath, appendPath) {
    return path.join(basePath, appendPath);
  }

  createDirIfNotExists(dirPath) {
    if (!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath);
    }
  }
}

const PathHelper = new PathHelperClass();

module.exports = {
  PathHelper
}
