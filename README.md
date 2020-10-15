# jsx-tokenizer 介绍 (jsx-tokenizer presentation)

作用：jsx 词法解析

思想：有限状态机

使用有限状态机思想将代码处理成 tokens 片段，不校验代码的合法性。代码合法性在语法解析阶段校验。

jsx-tokenizer is written to be the example to show how to use finite-state machine mode to analysis jsx statement.

### 安装 (how to install)

```shell
  npm i jsx-tokenizer
```

### 使用(how to use)

```javascript
const { tokenizer } = require('jsx-tokenizer')
let sourceCode =
  '<h1    id="title"     style="background: green;"  ><span>   hello</span>world</h1>    '
console.log('tokenizer词法解析结果:', tokenizer(sourceCode))
```

### 其他(others)

有疑问欢迎在 github 下留言讨论，也可以联系作者邮箱：kinyaying@gmail.com。

if you want to discuss the details of jsx-tokenizer, please leave words on github. Or you can concat the author, you can email me at kinyaying@gmail.com.
