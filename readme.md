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

The plugin provides two ways to handle language selection:

1. **Free-form Language Input**: By default (when no languages are configured), users can enter any valid Prism.js language key through a text input.

2. **Predefined Language Dropdown**: When you provide a languages configuration, users can select from a predefined list of languages through a dropdown menu.

You can configure the language selection behavior using these options:

#### Predefined Languages
Provide a custom mapping of Prism.js language keys to their display names:

```javascript
var editor = new EditorJS({
  // ...
  tools: {
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
        }
      } 
    }
  },
});
```

#### Force Show Language Input
If you want to allow both predefined language selection AND free-form language input, use the `forceShowLanguageInput` option:

```javascript
var editor = new EditorJS({
  // ...
  tools: {
    code: {
      class: editorJsCodeCup,
      config: {
        languages: { 
          javascript: "JavaScript",
          python: "Python",
          // ... other languages
        },
        forceShowLanguageInput: true // Shows both dropdown and language input
      } 
    }
  },
});
```

Refer to [Prism.js supported languages](https://prismjs.com/#supported-languages) for the available language mappings.

## Data Format
The data imported/exported from the block is as follows:

| Name                       | Description                                                |
| -------------------------- | ---------------------------------------------------------- |
| code                       | The code that is displayed in the editor, with line breaks |
| language (optional)        | The programming language                                   |
| showlinenumbers (optional) | Will show/hide the line numbers (Default true)             |
| showCopyButton (optional)  | Will show/hide the copy button (Default true)              |

Since language and linenumbers are optional, existing ```code``` blocks can safley use this plugin



---

## Contributing

@calumk

@keertyverma

