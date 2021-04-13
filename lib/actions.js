const fs = require("fs")
const { promisify } = require("util")
const open = require("open")

const download = promisify(require("download-git-repo"))
const { vueRepo } = require("../config/repo-config")
const commandSpawn = require("../utils/spawnCommand")
const templateCompile = require("../utils/templateCompile")
const { createDir } = require("../utils/createDir")

const createProjectAction = async (project) => {
  console.log("sky 正在为您创建项目中......");

  await download(vueRepo, project, { clone: true });
  const command = process.platform === "win32" ? "npm.cmd" : "npm"

  await commandSpawn(command, ['install'], { cwd: `./${project}` })
  await commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });

  open("http://localhost:8080")
}

const addComponent = async (name, dest) => {
  console.log("sky 正在为您创建组件中......");

  const templatePath = `../templates/vue-component.ejs`
  const result = await templateCompile(templatePath, { name, lowerName: name.toLowerCase() })
  createDir(dest)
  fs.promises.writeFile(`${dest}/${name}.vue`, result)
}

const addPageAndRoute = async (name, dest) => {
  console.log(("sky 正在为你创建页面与建立路由......"));

  const pageTemplatePath = `../templates/vue-page.ejs`
  const routerTemplatePath = `../templates/vue-router.ejs`
  const pageResult = await templateCompile(pageTemplatePath, { name, lowerName: name.toLowerCase() })
  const routerResult = await templateCompile(routerTemplatePath, { name, lowerName: name.toLowerCase() })
  createDir(dest)
  fs.promises.writeFile(`${dest}/${name}.vue`, pageResult)
  fs.promises.writeFile(`${dest}/${name}.js`, routerResult)
}

const addStore = async (name, dest) => {
  console.log(("sky 正在为你创建store......"));

  const storeTemplatePath = `../templates/vue-store.ejs`
  const typesTemplatePath = `../templates/vue-types.ejs`
  const storeResult = await templateCompile(storeTemplatePath, {})
  const typesResult = await templateCompile(typesTemplatePath, {})
  createDir(`${dest}/${name}`)
  // createDir(dest)
  fs.promises.writeFile(`${dest}/${name}/index.js`, storeResult)
  fs.promises.writeFile(`${dest}/${name}/types.js`, typesResult)
}

module.exports = {
  createProjectAction,
  addComponent,
  addPageAndRoute,
  addStore
}