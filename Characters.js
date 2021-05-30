function sanitize(message){
  return message.replace(/[áàãâäÃÀÁÂÄ]/g, 'A')
                .replace(/[éèêëÊÉÈË]/g, 'E')
                .replace(/[íìîïÌÍÎÏ]/g, 'I')
                .replace(/[óòõôöÒÓÔÖÕ]/g, 'O')
                .replace(/[úùûüÚÛÙÜ]/g, 'U')
                .replace(/[ç]/g, 'C')
                .replace(/[!@#$%?*¨&()_+={}:;.>,<-]/g, '')
                .replace(/[0-9]/g, '')
                .replace(/[\s\n\t]/g, '')
                .toUpperCase()
}

function putInVigenereRange(charCode){
  return charCode - 65
}

function isValidDecimalASCIICode(decASCIICode){
  return decASCIICode > 64 && decASCIICode < 91
}

function onlyUpperCaseDecimalASCIICode(acc, actual){
  let toValidRange = actual - 32

  return isValidDecimalASCIICode(toValidRange)
    ? [...acc, toValidRange]
    : acc
}

function takeValidInputCodes(decASCIICodes){
  return decASCIICodes.length && decASCIICodes.every(isValidDecimalASCIICode)
    ? decASCIICodes
    : []
}

function takeCodes(message){
  let spledCodeMessage = message.split("").map(c => c.charCodeAt(0))
  let validCodes = takeValidInputCodes(spledCodeMessage)
  
  return validCodes.map(putInVigenereRange)
}

module.exports = {
  onlyUpperCaseDecimalASCIICode,
  putInVigenereRange,
  sanitize,
  takeCodes
}