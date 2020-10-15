/**
 * 词法分析
 * - 有限状态机模式
 * - 遍历输入的字符，根据每次输入的char判断当前行为，猜测下次行为
 * - 词法解析只分词，不判断语法是否有问题
 */

const tokenTypes = require('./tokenTypes')
const Letters = /[a-zA-Z0-9]/
const Symbols = /\:|\s|\;/
let currentToken = { type: '', value: '' }
let tokens = []
function start(char) {
  if (char === '<') {
    emit({ type: tokenTypes.LeftParenthese, value: '<' })
    return foundLeftParenthese
  }
  throw new Error('第一个字符是<')
}
function emit(token) {
  tokens.push(token)
  currentToken = { type: '', value: '' }
}
function foundLeftParenthese(char) {
  if (Letters.test(char)) {
    currentToken.type = tokenTypes.JSXIdentifier
    currentToken.value += char
    return jsxIdentifier
  } else if (char === '/') {
    emit({ type: tokenTypes.BackSlash, value: '/' })
    return foundLeftParenthese
  }
}

function jsxIdentifier(char) {
  if (Letters.test(char)) {
    currentToken.value += char
    return jsxIdentifier
  } else if (char == ' ') {
    emit(currentToken)
    return attribute
  } else if (char == '>') {
    emit(currentToken)
    emit({ type: tokenTypes.RightParenthese, value: '>' })
    return foundRightParenthese
  }
}

function attribute(char) {
  if (Letters.test(char)) {
    currentToken.type = tokenTypes.AttributeKey
    currentToken.value += char
    return attributeKey
  } else if (char === ' ') {
    return attribute
  } else if (char == '>') {
    return tryLeaveAttribute(char)
  }
}

function attributeKey(char) {
  if (Letters.test(char)) {
    currentToken.value += char
    return attributeKey
  } else if (char === '=') {
    emit(currentToken)
    return attributeValue
  }
}

function attributeValue(char) {
  if (char === `"` || char === `'`) {
    currentToken.type = tokenTypes.AttributeValue
    return attributeStringValue
  }
}

function attributeStringValue(char) {
  if (Letters.test(char)) {
    currentToken.value += char
    return attributeStringValue
  } else if (char === `"` || char === `'`) {
    emit(currentToken)
    return tryLeaveAttribute
  } else if (Symbols.test(char)) {
    currentToken.value += char
    return attributeStringValue
  }
}

function tryLeaveAttribute(char) {
  if (char === ' ') {
    return attribute
  } else if (char === '>') {
    emit({ type: tokenTypes.RightParenthese, value: '>' })
    return foundRightParenthese
  }
}
function foundRightParenthese(char) {
  if (char === '<') {
    emit({ type: tokenTypes.LeftParenthese, value: '<' })
    return foundLeftParenthese
  } else {
    currentToken.type = tokenTypes.JSXText
    currentToken.value += char
    return jsxText
  }
}
function jsxText(char) {
  if (char === '<') {
    emit(currentToken)
    emit({ type: tokenTypes.LeftParenthese, value: '<' })
    return foundLeftParenthese
  } else {
    currentToken.value += char
    return jsxText
  }
}

function tokenizer(input) {
  let state = start
  for (let char of input) {
    state = state(char)
  }
  return tokens
}

module.exports = {
  tokenizer,
}
