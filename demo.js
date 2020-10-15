let esprima = require('esprima')
const { tokenizer } = require('./index.js')

let sourceCode =
  '<h1    id="title"     style="background: green;"  ><span>   hello</span>world</h1>    '
let ast = esprima.parseModule(sourceCode, { jsx: true, tokens: true })
console.log('esprima词法解析结果:', ast.tokens)
console.log('tokenizer词法解析结果:', tokenizer(sourceCode))
