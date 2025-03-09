# EditorJs - CodeCup

### NPM
    npm i @calumk/editorjs-codecup

### JS
    https://cdn.jsdelivr.net/npm/@calumk/editorjs-codecup@latest

---

## About

This is an EditorJs wrapper for [CodeCup](https://github.com/calumk/codecup) - A lovely lightweight zero-dep code formatter

It was built to be an improvement on :

* https://github.com/editor-js/code - Too Basic
* https://github.com/dev-juju/codebox - Agressive styling, and exports more data than markdown can handle


## Demo

![Demo ](./example-media/example2.gif)


## Built with:

* [CodeCup](https://github.com/calumk/codecup)
* [Prism](https://www.npmjs.com/package/prismjs)


---

## Installation / Use

```javascript
import EditorJS from '@editorjs/editorjs';
import editorjsCodecup from '@calumk/editorjs-codecup';

var editor = new EditorJS({
  // ...
  tools: {
    ...
    code : editorjsCodecup
  },
});
```

### Language Selection

This plugin includes a dropdown that enables users to choose a programming language for syntax highlighting with Prism.js.
<br />Additionally, users can override the default language mapping by providing custom mappings of Prism.js language keys to their preferred display names in the configuration.
<br />Refer to [Prism.js supported languages](https://prismjs.com/#supported-languages) for the available language mappings.


#### Example Configuration

```javascript
import EditorJS from '@editorjs/editorjs';
import editorjsCodecup from '@calumk/editorjs-codecup';

var editor = new EditorJS({
  // ...
  tools: {
    ...
    code: {
      class: editorJsCodeCup,
      config: {
        languages: { 
          javascript: "JavaScript",
          python: "Python",
          java: "Java",
          cpp: "C++",
          csharp: "C#",
          go: "Go",
          none: "Plain Text",
        } // override language selection
      } 
    }
  },
});
```

## Data Format
The data imported/exported from the block is as follows:

| Name                       | Description                                                |
| -------------------------- | ---------------------------------------------------------- |
| code                       | The code that is displayed in the editor, with line breaks |
| language (optional)        | The programming language                                   |
| showlinenumbers (optional) | Will show/hide the line numbers (Default true)             |
| showCopyButton (optional)  | Will show/hide the copy button (Default true)              |

Since language and linenumbers are optional, existing ```code``` blocks can safley use this plugin



<!-- ---

## Markdown Compatability

> TODO!

This plugin *will be* compatible with

    npm i editorjs-markdown-parser

It will import/export using the code fence markdown style, with the language printed imediatly after the first fence, as described in [GFM #117](https://github.github.com/gfm/#example-112)

Line-numbers cant be expressed in markdown, so will be ommited

Example :

    ```javascript
    \\ Hello World
    ``` -->
