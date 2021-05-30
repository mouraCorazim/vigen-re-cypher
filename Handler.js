const FileSystem = require('fs')
const File = require('./File.js')

function inputHandle(argsMap){
  const flags = {
    '--encode': File.encode,
    '--decode': File.decode
  }

  const names = {
    '--encode': ".encoded",
    '--decode': ".decoded"
  }

  let filename = argsMap.filePath + names[argsMap.flag]

  let buffer = FileSystem.readFileSync(argsMap.filePath, File.errorHandler)

  let data = flags[argsMap.flag](buffer, argsMap.key)

  let result = FileSystem.writeFileSync(filename, data, File.errorHandler)
}

module.exports = {
  inputHandle
}