function takeKeyChar(key, index){
  return index >= 0 && index < key.length
    ? key[index]
    : key[index % key.length]
}

function cyphMap(wordChar, keyChar){
  return {'wordChar': wordChar,
          'keyChar' : keyChar}
}

function keyToZipReceiver(key){
  return (char, index) => cyphMap(char, takeKeyChar(key, index))
}

function crypt(cyphMap){
  return ((cyphMap.wordChar + cyphMap.keyChar) % 26) + 65
}

function decrypt(cyphMap){
  return ((cyphMap.wordChar - cyphMap.keyChar + 26) % 26) + 65
}

module.exports = {
  keyToZipReceiver,
  crypt,
  decrypt
}