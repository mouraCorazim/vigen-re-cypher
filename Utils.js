function zip(a, b, fn){
  return a.map(fn(b))
}

function compose(f, g){
  return x => f(g(x))
}

module.exports = {
  zip,
  compose
}