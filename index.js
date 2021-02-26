/* 
* Cifra de Vigenère
*/

const Cypher = require('./Cypher.js')

const crypt = (cryptCharCode, keyCharCode) => ((cryptCharCode + keyCharCode) % 26) + 65
const decrypt = (dcryptCharCode, keyCharCode) => ((dcryptCharCode - keyCharCode + 26) % 26) + 65

const key = "LIMAO"
const message = "atacar !@&$*!#(*@#%$()_-+ }?}{?:><,.,. base 029384 0239480   09234 sul"

// "ATACARBASESUL"
const sanitizedMessage = message.replace(/[áàãâä]/g, 'a')
                                .replace(/[éèêë]/g, 'e')
                                .replace(/[íìîï]/g, 'i')
                                .replace(/[óòõôö]/g, 'o')
                                .replace(/[úùûü]/g, 'u')
                                .replace(/[ç]/g, 'c')
                                .replace(/[!@#$%?*¨&()_+={}:;.>,<-]/g, '')
                                .replace(/[0-9]/g, '')
                                .replace(/[\s\n\t]/g, '')
                                .toUpperCase()

// [0, 19, 0, 2, 0, 17, 1, 0, 18, 4, 18, 20, 11]
const spledCodeMessage = Array.from(sanitizedMessage).map(c => c.charCodeAt(0) - 65)

// [11, 8, 12, 0, 14]
const spledCodeKey = Array.from(key).map(c => c.charCodeAt(0) - 65)

//LBMCOCJMSSDC
const encodedMessage = Cypher().of(spledCodeKey)
                               .from(spledCodeMessage)
                               .make(crypt)
                               .map(c => String.fromCharCode(c))
                               .join("")

// [11, 1, 12, 2, 14, 2, 9, 12, 18, 18, 3, 2, 23]
const spledCodeEncodedMessage = Array.from(encodedMessage).map(c => c.charCodeAt(0) - 65)

// ATACARBASESUL
const decodedMessage = Cypher().of(spledCodeKey)
                               .from(spledCodeEncodedMessage)
                               .make(decrypt)
                               .map(c => String.fromCharCode(c))
                               .join("")

console.log(encodedMessage)
console.log(decodedMessage)