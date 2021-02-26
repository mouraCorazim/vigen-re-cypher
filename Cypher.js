function Cypher(obj = {'type': "CypherValue"}){

  const isValidValue = value => value && value.key && value.word && value.type == "CypherValue"
  const isValidKeyWord = kw => kw && kw.length
  const reduce = (cryptVlue, fcrypt) => {

    const acc = []

    for(let i = 0, j = 0; i < cryptVlue.word.length; i++, j++){

      if(j == cryptVlue.key.length) j = 0

      const charCodeResult = fcrypt(cryptVlue.word[i], cryptVlue.key[j])
    
      acc.push(charCodeResult)
    }

    return acc
  }

  return {
    'of': key => 
      isValidKeyWord(key)? Cypher({'key': key, ... obj}): Cypher(obj),
    'from': word => 
      isValidKeyWord(word)? Cypher({'word': word, ... obj}): Cypher(obj),
    'make': fcrypt => 
      isValidValue(obj)? reduce(obj, fcrypt): []
  }
}

module.exports = Cypher