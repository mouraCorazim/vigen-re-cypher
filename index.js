/* 
* Cifra de Vigenère
*/

function Cypher(obj = {'type': "CypherValue"}){

  const isValidValue = value => value && value.key && value.word && value.type == "CypherValue"
  const isValidKeyWord = kw => kw && kw.length

  return {
    'of': key => 
      isValidKeyWord(key)? Cypher({'key': key, ... obj}): Cypher(obj),
    'from': word => 
      isValidKeyWord(word)? Cypher({'word': word, ... obj}): Cypher(obj),
    'make': fcrypt => 
      isValidValue(obj)? fcrypt(obj): Cypher(obj)
  }
}

const crypt = (cryptc, keyc) => ((cryptc + keyc) % 26) + 65

const decrypt = (dcryptc, keyc) => ((dcryptc - keyc + 26) % 26) + 65

const fn = fcrypt => cryptVlue => {

  const r = []

  for(let i = 0, j = 0; i < cryptVlue.word.length; i++, j++){

    if(j == cryptVlue.key.length) j = 0

    const cc = fcrypt(cryptVlue.word[i], cryptVlue.key[j])
    
    r.push(cc)
  }

  return r
}

const k = "LIMAO"
const w = "atacar !@&$*!#(*@#%$()_-+ }?}{?:><,.,. base 029384 0239480   09234 sul"

// "ATACARBASESUL"
const sw = w.replace(/[áàãâä]/g, 'a')
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
const spledW = Array.from(sw).map(c => c.charCodeAt(0) - 65)

// [11, 8, 12, 0, 14]
const spledK = Array.from(k).map(c => c.charCodeAt(0) - 65)

//LBMCOCJMSSDC
const cyw = Cypher().of(spledK)
                    .from(spledW)
                    .make(fn(crypt))
                    .map(c => String.fromCharCode(c))
                    .join("")

// [11, 1, 12, 2, 14, 2, 9, 12, 18, 18, 3, 2, 23]
const decw = Array.from(cyw).map(c => c.charCodeAt(0) - 65)

// ATACARBASESUL
const dyw = Cypher().of(spledK)
                    .from(decw)
                    .make(fn(decrypt))
                    .map(c => String.fromCharCode(c))
                    .join("")

console.log(cyw)
console.log(dyw)