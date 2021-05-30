const Args = require('./Args.js')
const Handler = require('./Handler.js')

const slicedArgs = process.argv.slice(2)
const argsMap = Args.areCorrect(slicedArgs)

Handler.inputHandle(argsMap)