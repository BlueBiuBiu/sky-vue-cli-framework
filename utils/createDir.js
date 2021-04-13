const path = require("path")
const fs = require("fs")

const createDir = (dest) => {
  if (fs.existsSync(dest)) {
    return true;
  } else {
    if (createDir(path.dirname(dest))) {
      fs.mkdirSync(dest)
      return true;
    }
  }
}

module.exports = {
  createDir
}