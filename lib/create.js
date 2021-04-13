const program = require('commander');

const { createProjectAction, addComponent, addPageAndRoute, addStore } = require("./actions")

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)

  program
    .command('addCpn <name>')
    .description('add vue component, 例如; skyvue addCpn Hello_World [-d src/components]')
    .action((name) => {
      addComponent(name,program.opts().dest || "src/components")
    })

  program
    .command('addPage <name>')
    .description('add vue addPageAndRoute, 例如; skyvue addPage Hello_World [-d src/pages]')
    .action((name) => {
      addPageAndRoute(name, program.opts().dest || "src/pages")
    })

  program
    .command('addStore <name>')
    .description('add vue store, 例如; skyvue addStore Hello_World [-d src/store/modules]')
    .action((name) => {
      addStore(name, program.opts().dest || "src/store/modules")
    })
}

module.exports = {
  createCommands
}