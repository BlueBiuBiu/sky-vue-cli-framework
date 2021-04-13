const ejs = require("ejs")

const templateCompile = (templatePath, data) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, (err, result) => {
      if (err) reject(err);
      resolve(result)
    })
  })
}

module.exports = templateCompile