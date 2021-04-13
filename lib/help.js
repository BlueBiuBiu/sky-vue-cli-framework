const program = require('commander');

const helpOptions = () => {
  program.option('-w --write', 'a sky cli')
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d /src/components')

  program.on('--help', function () {
    console.log("");
    console.log("Other:")
    console.log("  other options~");
  })
}

module.exports = {
  helpOptions
}