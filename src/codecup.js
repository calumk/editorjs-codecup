
 /**
  * EditorJsCodeCup Block for the Editor.js.
  *
  * @author Calum Knott (calum@calumk.com)
  * @license The MIT License (MIT)
  */
 
 /**
  * @typedef {object} EditorJsCodeCupConfig
  * @property {string} placeholder - placeholder for the empty EditorJsCodeCup
  * @property {boolean} preserveBlank - Whether or not to keep blank EditorJsCodeCups when saving editor data
  * @property {Object.<string, string>} languages - 
  * Custom mapping of Prism.js language keys to their display names. 
  * Users can override the default language selection by providing a custom mapping.
  *
  * Example:
  * languages: { 
  *   csharp: "C#",
  *   javascript: "JavaScript",
  *   python: "Python",
  *   java: "Java",
  * }
  */
 
 /**
  * @typedef {Object} EditorJsCodeCupData
  * @description Tool's input and output data format
  * @property {String} text — EditorJsCodeCup's content. Can include HTML tags: <a><b><i>
  */

  import style from './codecup.css'
  import icon from './codecup.svg';


  import codecup from '@calumk/codecup/dist/codecup.bundle.js';
  import components from "prismjs/components.json";


 
 class EditorJsCodeCup {
   /**
    * Default placeholder for EditorJsCodeCup Tool
    *
    * @return {string}
    * @constructor
    */
   static get DEFAULT_PLACEHOLDER() {
     return '// Hello';
   }

   static get enableLineBreaks() {
    return true;
  }
   /**
   * Returns the default set of supported languages.
   * @return {Object} Default language map (PrismJS key -> Label)
   */
   static getDefaultLanguages() {
    return {
      bash: "Bash",
      c: "C",
      cpp: "C++",
      csharp: "C#",
      css: "CSS",
      go: "Go",
      html: "HTML",
      java: "Java",
      javascript: "JavaScript",
      json: "JSON",
      kotlin: "Kotlin",
      none: "Plain Text",
      php: "PHP",
      python: "Python",
      ruby: "Ruby",
      rust: "Rust",
      sql: "SQL",
      swift: "Swift",
      typescript: "TypeScript",
    };
  }
 
   /**
    * Render plugin`s main Element and fill it with saved data
    *
    * @param {object} params - constructor params
    * @param {EditorJsCodeCupData} params.data - previously saved data
    * @param {EditorJsCodeCupConfig} params.config - user config for Tool
    * @param {object} params.api - editor.js api
    * @param {boolean} readOnly - read only mode flag
    */
   constructor({data, config, api, readOnly}) {
    //  console.log(data)
     this.api = api;
     this.readOnly = readOnly;
 
     this._CSS = {
       block: this.api.styles.block,
       wrapper: 'ce-EditorJsCodeCup',
       settingsButton: this.api.styles.settingsButton,
       settingsButtonActive: this.api.styles.settingsButtonActive,
     };
 
     if (!this.readOnly) {
       this.onKeyUp = this.onKeyUp.bind(this);
     }
 
     /**
      * Placeholder for EditorJsCodeCup if it is first Block
      * @type {string}
      */
     this._placeholder = config.placeholder ? config.placeholder : EditorJsCodeCup.DEFAULT_PLACEHOLDER;

     this._preserveBlank = config.preserveBlank !== undefined ? config.preserveBlank : false;

     // Use custom languages from config if provided; otherwise, use defaults.
     this._languages =
      config.languages && Object.keys(config.languages).length > 0
      ? config.languages
      : EditorJsCodeCup.getDefaultLanguages();

     this._element; // used to hold the wrapper div, as a point of reference

 

     // let x = (x === undefined) ? your_default_value : x;
     this.data = {}
     this.data.code = (data.code === undefined) ? '// Hello World' : data.code;
     this.data.language = (data.language === undefined) ? 'plain' : data.language.toLowerCase();
     this.data.showlinenumbers = (data.showlinenumbers === undefined) ? true : data.showlinenumbers;
     this.data.showCopyButton = (data.showCopyButton === undefined) ? true : data.showCopyButton;
     this.data.editorInstance = {}

    //  console.log(this.data)

   }
 
   /**
    * Check if text content is empty and set empty string to inner html.
    * We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
    *
    * @param {KeyboardEvent} e - key up event
    */
   onKeyUp(e) {
     if (e.code !== 'Backspace' && e.code !== 'Delete') {
       return;
     }

    //  console.log(e)
 
     const {textContent} = this._element;
 
     if (textContent === '') {
       this._element.innerHTML = '';
     }
   }

 
   /**
    * Return Tool's view
    *
    * @returns {HTMLDivElement}
    */
   render() {

    this._element = document.createElement('div');
    this._element.classList.add('editorjs-codeCup_Wrapper')
    let editorElem = document.createElement('div');
    editorElem.classList.add('editorjs-codeCup_Editor')

    let langdisplay = document.createElement('div');
    langdisplay.classList.add('editorjs-codeCup_LangDisplay')
    langdisplay.innerHTML = this.data.language === "plain"  ? "Plain Text" : this._languages[this.data.language] || this.data.language;

    this._element.appendChild(editorElem)
    this._element.appendChild(langdisplay)

    // console.log(this.data.editorInstance)

    this.data.editorInstance = new codecup(editorElem, { 
      language: this.data.language, 
      lineNumbers : this.data.showlinenumbers,
      readonly : this.readOnly,
      copyButton : this.data.showCopyButton,
    });

    

    this.data.editorInstance.onUpdate((code) => {
      // console.log("onUpdate fired")
      // console.log(code)
      let _length = code.split('\n').length
      this._debounce(this._updateEditorHeight(_length))
    });
    

    // this.data.editorInstance.addLanguage(this.data.language, Prism.languages[this.data.language]);
    this.data.editorInstance.updateCode(this.data.code);

    // console.log(this.data.code)
    // console.log(this.data.editorInstance.getCode())
    // console.log(this._element)

    return this._element
   }

  _updateEditorHeight(length){

    let _height = (length * 21) + 10
    if (_height < 60){ _height = 60 }

    this._element.style.height = _height + 'px';
  }


  _debounce(func, timeout = 500){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  _renderLanguageDropdown(languageSelectContainer) {
    const dropdown = document.createElement("div");
    dropdown.classList.add("editorjs-codeCup_languageDropdown");
  
    // Sort languages alphabetically by their display names, ensuring case-insensitive ordering
     const sortedLanguages = Object.entries(this._languages).sort((a, b) =>
      a[1].localeCompare(b[1], undefined, { sensitivity: "base" })
    );
  
    // Generate language options
    const fragment = document.createDocumentFragment(); // Using DocumentFragment to minimize DOM reflows
    sortedLanguages.forEach(([key, label]) => {
      const langOption = document.createElement("div");
      langOption.classList.add("editorjs-codeCup_languageOption");
      langOption.innerText = label;
  
      // Handle selection
      langOption.addEventListener("click", (event) => {
        event.stopPropagation()
        const isUpdated = this._updateLanguage(key, label);
        if(isUpdated) dropdown.style.display = "none"; // close the dropdown
      });
  
      fragment.appendChild(langOption); 
    });
    dropdown.appendChild(fragment); // Append all language options to DOM in a single operation to improve performance
  
    languageSelectContainer.appendChild(dropdown)
  }
  
  _renderLanguageSelectContainer() {
    const languageSelectContainer = document.createElement('div');
    languageSelectContainer.classList.add('ce-popover-item'); 
    languageSelectContainer.classList.add('editorjs-codeCup_languageSelectContainer'); 
    languageSelectContainer.innerHTML = `
      <div class="ce-popover-item__icon ce-popover-item__icon--tool">
        <svg width="64px" height="64px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000">
          <polyline points="160 368 32 256 160 144" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></polyline>
          <polyline points="352 368 480 256 352 144" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></polyline>
          <line x1="304" y1="96" x2="208" y2="416" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></line>
        </svg>
      </div>
      <div class="ce-popover-item__title">Select Language</div>
    `;
  
    languageSelectContainer.addEventListener('click', (event) => {
      event.stopPropagation();
  
      // Toggle dropdown: remove if already open, otherwise show it
      const existingDropdown = document.querySelector(".editorjs-codeCup_languageDropdown");
      if (existingDropdown) {
        existingDropdown.remove();
      } else {
        this._renderLanguageDropdown(languageSelectContainer);
      }
    });
  
    return languageSelectContainer
  }

   renderSettings() {
    const settingsContainer = document.createElement('div');
     /** Toggle Line Numbers Button */
    // Disabled until codeCup supports toggle of line numbers
    const toggleButton = document.createElement('div');
    const toggleButtonInner = document.createElement('div');
    toggleButton.classList.add('ce-popover-item');
    toggleButtonInner.classList.add('ce-popover-item__title');

    if(this.data.showlinenumbers){
      toggleButtonInner.innerHTML = 'Hide Numbers'
    }else{
      toggleButtonInner.innerHTML = 'Show Numbers'
    }

    // append a html string directly to the element
    let string = `<div class="ce-popover-item__icon ce-popover-item__icon--tool">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="48" y1="40" x2="208" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M154.91,157.6a40,40,0,0,1-53.82-59.2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M135.53,88.71a40,40,0,0,1,32.3,35.53" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M208.61,169.1C230.41,149.58,240,128,240,128S208,56,128,56a126,126,0,0,0-20.68,1.68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M74,68.6C33.23,89.24,16,128,16,128s32,72,112,72a118.05,118.05,0,0,0,54-12.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
    </div>`
    toggleButton.innerHTML = string


    toggleButton.appendChild(toggleButtonInner);

    toggleButton.addEventListener('click', (e) => {
      // console.log(e)
      e.target.classList.toggle(this._CSS.settingsButtonActive)
      this._toggleLineNumbers()
      if(this.data.showlinenumbers){
        toggleButtonInner.innerHTML = 'Hide Numbers'
      }else{
        toggleButtonInner.innerHTML = 'Show Numbers'
      }
    });

     /** Language Entry Input */
    const languageEntryInputContainer = document.createElement('div');
    languageEntryInputContainer.classList.add('editorjs-codeCup_inputContainer');

// <div contenteditable class="cdx-input" data-placeholder="Custom placeholder"></div>
    let languageEntryInput = document.createElement("div")
    languageEntryInput.classList.add("editorjs-codeCup_input")
    languageEntryInput.setAttribute("contenteditable", "true")
    languageEntryInput.setAttribute("data-placeholder", "Enter a language...")

    let languageEntryInputButton = document.createElement("div")
    let string2 = `<div class="ce-popover-item__icon ce-popover-item__icon--tool">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M136,136a8,8,0,0,1,8,8,16,16,0,0,1-16,16,24,24,0,0,1-24-24,32,32,0,0,1,32-32,40,40,0,0,1,40,40,48,48,0,0,1-48,48,56,56,0,0,1-56-56,64,64,0,0,1,64-64,72,72,0,0,1,72,72,80,80,0,0,1-80,80,88,88,0,0,1-88-88,96,96,0,0,1,96-96A104,104,0,0,1,240,144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
    </div>`
    languageEntryInputButton.innerHTML = string2
    languageEntryInputButton.classList.add("editorjs-codeCup_inputButton")
    languageEntryInputButton.addEventListener('click', (event) => {
      let lang = languageEntryInput.textContent
      if(lang != ''){
        const isUpdated = this._updateLanguage(lang)
        if(isUpdated) languageEntryInput.textContent = '' // clear the input field
      }
    });


    languageEntryInputContainer.appendChild(languageEntryInput)
    languageEntryInputContainer.appendChild(languageEntryInputButton)
    // languageEntryInput.addEventListener('input', (event) => {
    //   console.log(event)
    //   // this._updateLanguage(event.target.value)

    // });

    settingsContainer.appendChild(toggleButton);
    settingsContainer.appendChild(this._renderLanguageSelectContainer());  // Language Selection
    settingsContainer.appendChild(languageEntryInputContainer);

    return settingsContainer;
  }

  _toggleLineNumbers = (thing) => {
    this.data.showlinenumbers = !this.data.showlinenumbers

    this.data.editorInstance.toggleLineNumbers()

    // console.log(this.data.editorInstance)
    // replace this with a native method for codeCup, if it gets implemented.
    // for now, we will completely destroy the codeCup instance, and rebuild it - lazy but effective

  }

  /**
   * Updates the selected language for syntax highlighting in the editor.
   * - If the provided language is valid Prismjs language key, updates the editor's language setting and UI.
   * - If the language is invalid, displays an error message and does not update the language.
   * @param {string} language - The Prism.js language key (e.g., "javascript", "csharp").
   * @param {string} label - The display name for the language (e.g., "JavaScript", "C#").
   *                         If not provided, `language` is used as the display name.
   * @returns {boolean} - Returns `true` if the language was successfully updated, otherwise `false`.
   */
  _updateLanguage(language, label) {
    if(!this._isValidLanguage(language)) {
      this._handleErrorMessage(language); // Show an error message for the invalid language
      return false;
    }

    // Normalize language identifier to lowercase to prevent PrismJS from misidentifying or failing to autoload syntax highlighting.
    const normalizedLang = language.toLowerCase()
    
    // Use "plain" internally for consistency since PrismJS uses "none". 
    // This ensures users can reset to plain text properly.
    this.data.language = normalizedLang === 'none' ? 'plain' : normalizedLang;
    this.data.editorInstance.updateLanguage(normalizedLang);

    this._element.querySelector('.editorjs-codeCup_LangDisplay').innerHTML = label || this._languages[normalizedLang] || this.data.language
    this._handleErrorMessage(null); // Remove error message if previously shown
    return true;
  }

  /**
   * Checks if the given language is a valid Prism.js language or an alias.
   * @param {string} language - The language key to validate.
   * @returns {boolean} - Returns `true` if the language or its alias is supported by Prism.js, otherwise `false`.
  */
  _isValidLanguage = (language) => {
    if (!language) return false;
    const normalizedLang = language.toLowerCase()
    if(normalizedLang === 'none') return true; // Allow "none" as a valid option for plaintext
    
    // Check if the language matches a primary Prism.js language
    const SUPPORTED_LANGUAGES = Object.keys(components.languages);
    const languageSet = new Set(SUPPORTED_LANGUAGES);
    if(languageSet.has(normalizedLang.toLowerCase())) {
      return true;
    }
  
    // Check if the language matches any aliases
    return SUPPORTED_LANGUAGES.some((language) => {
      const langConfig = components.languages[language];
      if (langConfig && langConfig.alias) {
        const aliases = Array.isArray(langConfig.alias) ? langConfig.alias : [langConfig.alias];
        return aliases.includes(normalizedLang.toLowerCase());
      }
      return false;
    });
  };

   /**
   * Manages the display of an error message for invalid syntax highlighting languages.
   * - If an invalid language is provided, an error message is shown.
   *   Users can manually dismiss the error message using a close button.
   * - If a valid language is entered, any existing error message is removed.
   * @param {string|null} language - The invalid language key. If `null`, the error message is removed.
   */
   _handleErrorMessage = (language) => {
    if (!this._element) return;

    let errorMessage = this._element.parentNode.querySelector('.editorjs-codeCup_languageErrorMessage')
    if(language) {
      // Display an error message
      if(!errorMessage) {
        errorMessage = document.createElement('div')
        errorMessage.classList.add('editorjs-codeCup_languageErrorMessage');
        this._element.before(errorMessage) // Insert the error message before the editor element
      }
      errorMessage.innerHTML = `⚠ Syntax highlighting is unavailable. "${language}" is not a valid Prism.js language key. <button class="close-error">&times;</button>`;
      
      errorMessage.querySelector('.close-error').addEventListener('click', () => {
        errorMessage.remove();
      });
    } else if (errorMessage) {
      errorMessage.remove(); // Remove any existing error message
    }
  }
 
   /**
    * Extract Tool's data from the view
    * @param {HTMLDivElement} toolsContent - EditorJsCodeCup tools rendered view
    * @returns {EditorJsCodeCupData} - saved data
    * @public
    */
   save(toolsContent) {
    let resp = {
      code : this.data.editorInstance.getCode(),
      language : this.data.language,
      showlinenumbers : this.data.showlinenumbers,
      showCopyButton : this.data.showCopyButton
    };
    
    return resp
   }
 
   /**
    * Returns true to notify the core that read-only mode is supported
    *
    * @return {boolean}
    */
   static get isReadOnlySupported() {
     return true;
   }

 
   /**
    * Icon and title for displaying at the Toolbox
    *
    * @return {{icon: string, title: string}}
    */
   static get toolbox() {
     return {
       icon: icon,
       title: 'CodeCup'
     };
   }
 }
 
export { EditorJsCodeCup as default }