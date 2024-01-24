
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
  */
 
 /**
  * @typedef {Object} EditorJsCodeCupData
  * @description Tool's input and output data format
  * @property {String} text — EditorJsCodeCup's content. Can include HTML tags: <a><b><i>
  */

  import style from './codecup.css'
  import icon from './codecup.svg';


  import codecup from '@calumk/codecup/dist/codecup.bundle.js';


 
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

     this._element; // used to hold the wrapper div, as a point of reference

 

     // let x = (x === undefined) ? your_default_value : x;
     this.data = {}
     this.data.code = (data.code === undefined) ? '// Hello World' : data.code;
     this.data.language = (data.language === undefined) ? 'plain' : data.language;
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

     console.log(e)
 
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

    langdisplay.innerHTML = this.data.language

    this._element.appendChild(editorElem)
    this._element.appendChild(langdisplay)

    // console.log(this.data.editorInstance)

    this.data.editorInstance = new codecup(editorElem, { 
      language: this.data.language, 
      lineNumbers : this.data.showlinenumbers,
      readonly : this.readOnly,
      copyButton : this.data.showCopyButton,
    });

    // console.log(this.data.editorInstance)
    

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

   renderSettings() {
    const settingsContainer = document.createElement('div');




    // let languagesSelect = document.createElement("select");
    // languagesSelect.classList.add("small");
    // languagesSelect.classList.add("wide");

    // //sort available languages alphabetically (ignore case)
    // let languages = Object.keys(Prism.languages).sort(function (a, b) {
    //     return a.toLowerCase().localeCompare(b.toLowerCase());
    // });

    // //Create and append the options
    // for (var i = 0; i < languages.length; i++) {
    //     // Weirdly PrismJS doesnt expose a list of installed languages, or rather it does, but it is mixed with helper functions, which i have to clear here.
    //     if (languages[i] == "extend" || languages[i] == "insertBefore" || languages[i] == "DFS") {
    //       continue;
    //     }

    //     var option = document.createElement("option");
    //     option.value = languages[i];
    //     option.text = languages[i];
    //     if(languages[i] == this.data.language){
    //       option.selected="selected"
    //     }
    //     languagesSelect.appendChild(option);
    // }

    // languagesSelect.addEventListener('change', (event) => {
    //   this._updateLanguage(event.target.value)
    // });


    // Disabled until codeCup supports toggle of line numbers
    const toggleButton = document.createElement('div');
    toggleButton.classList.add(this._CSS.settingsButton);
    if(this.data.showlinenumbers){
      toggleButton.innerHTML = '<small>Hide Numbers</small>'
    }else{
      toggleButton.innerHTML = '<small>Show Numbers</small>'
    }

    toggleButton.addEventListener('click', (e) => {
      // console.log(e)
      e.target.classList.toggle(this._CSS.settingsButtonActive)
      this._toggleLineNumbers()
    });



    // settingsContainer.appendChild(languagesSelect);
    // new NiceSelect(languagesSelect, {searchable : true, placeholder : "Language..."});
    
    // create a button, when you click the button there should be a js prompt to enter a language. the default should be the current language.
    let languageSelectButton = document.createElement("button");
    languageSelectButton.classList.add(this.api.styles.button);
    languageSelectButton.style.width = "100%";
    languageSelectButton.textContent = this.data.language;
    languageSelectButton.addEventListener('click', (event) => {

      let lang = prompt("Please enter a language", this.data.language);
      if (lang != null) {
        this._updateLanguage(lang)
        // also update the button text
        event.target.textContent = lang;
      }
    });

    settingsContainer.appendChild(toggleButton);
    settingsContainer.appendChild(languageSelectButton);

    return settingsContainer;
  }

  _toggleLineNumbers = (thing) => {
    this.data.showlinenumbers = !this.data.showlinenumbers

    this.data.editorInstance.toggleLineNumbers()

    // console.log(this.data.editorInstance)
    // replace this with a native method for codeCup, if it gets implemented.
    // for now, we will completely destroy the codeCup instance, and rebuild it - lazy but effective


  }

  _updateLanguage = (lang) => {
    this.data.language = lang
    this._element.querySelector('.editorjs-codeCup_LangDisplay').innerHTML = this.data.language
    this.data.editorInstance.updateLanguage(this.data.language)
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