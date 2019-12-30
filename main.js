var data = [], files, lines, word, kwic;
/*
var ONLY_PUNCT = /^[^0-9A-Za-z\s]*$/;

var RiTa = {
  STOP_WORDS: [ ".", ",",""],
  isPunctuation: function(text) {
    if (!text || !text.length) return false;
    return ONLY_PUNCT.test(text);
  }
}
*/
document.getElementById('file').onchange = function(){

  files = this.files;
  for (var i = 0; i < files.length; i++) {
    var fileToLoad = files[i];
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        let textFromFileLoaded = fileLoadedEvent.target.result;
        data.push(textFromFileLoaded);
      }
      fileReader.readAsText(fileToLoad, "UTF-8");
  }
  /*
  var fileToLoad = this.files[0];

  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent){
      textFromFileLoaded = fileLoadedEvent.target.result;
      //console.log(textFromFileLoaded);

      //lines = textFromFileLoaded.split('\n');
      //
      // var filtered = lines.filter(function (el) {
      //   //return el != null;
      //   console.log(el);
      //   return el != "";
      // });
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
  */
};

function updateKWIC() {
  word = document.getElementById("txt").value
  kwic = RiTa.kwic(data.join('\n'), word, {
  //kwic = RiTa.kwic(textFromFileLoaded, word, {
    ignorePunctuation: true,
    ignoreStopWords: true,
    wordCount: word.length
  });

  if (kwic.length == 0) {
    document.getElementById("demo").innerHTML = 'Word not found';
  }else {
    var el = '';
    for (var i = 0; i < kwic.length; i++) {
      var parts = kwic[i].split(word);
      //console.log(kwic[i]);
      el += "<p>" + parts[0] +" <span style='color:blue'>" + word +"</span> " + parts[1] + "</p>";
    }
    document.getElementById("demo").innerHTML = el;
  }

}
/*
function makeClass() { // from: Resig, TODO: make work with strict
  return function(args) {
    if (this instanceof arguments.callee) {
      if (typeof this.init == "function") {
        this.init.apply(this, args && args.callee ? args : arguments);
      }
    } else return new arguments.callee(arguments);
  };
}

var StringTokenizer = makeClass();

StringTokenizer.prototype = {

  init: function(str, delim) {

    this.idx = 0;
    this.text = str;
    this.delim = delim || " ";
    this.tokens = str.split(delim);
  },

  nextToken: function() {

    return (this.idx < this.tokens.length) ? this.tokens[this.idx++] : null;
  }
};

var Concorder = makeClass();

Concorder.prototype = {

  init: function(text, options) {

    this.model = null;
    this.wordsToIgnore = [];
    this.ignoreCase = false;
    this.ignoreStopWords = false;
    this.ignorePunctuation = false;

    if (options) {
      options.ignoreCase && (this.ignoreCase = true);
      options.ignoreStopWords && (this.ignoreStopWords = true);
      options.ignorePunctuation && (this.ignorePunctuation = true);
      options.wordsToIgnore && (this.wordsToIgnore = options.wordsToIgnore);
    }

    if (this.ignoreStopWords)
      this.wordsToIgnore = this.wordsToIgnore.concat(RiTa.STOP_WORDS);

    this.words = is(text, A) ? text : RiTa.tokenize(text);
  },

  count: function(word) {

    var value = this.lookup(word);
    return value === null ? 0 : value.count;
  },

  concordance: function() {

    if (!this.model) this.build();

    var result = {};
    for (var name in this.model)
      result[name] = this.model[name].indexes.length;

    // TODO: need to sort by value here
    return result;
  },

  kwic: function(word, numWords) {

    var value = this.lookup(word), result = [];
    if (value) {
      var idxs = value.indexes;
      for (var i = 0; i < idxs.length; i++) {
          var sub = this.words.slice(Math.max(0,idxs[i] - numWords),
            Math.min(this.words.length, idxs[i] + numWords+1));

          if (i < 1 || (idxs[i] - idxs[i - 1]) > numWords)
            result.push(RiTa.untokenize(sub));
      }
    }
    return result;
  },

  build: function() {

    if (!this.words) throw Error('No text in model');

    this.model = {};
    var ts = +new Date();
    for (var j = 0; j < this.words.length; j++) {

      var word = this.words[j];
      if (this.ignorable(word)) continue;
      var lookup = this.lookup(word);

      // The typeof check below fixes a strange bug in Firefox: #XYZ
      // where the string 'watch' comes back from lookup as a function
      // TODO: resolve in a better way
      if (!lookup || typeof lookup !== 'object') {

         lookup = { word: word, key: this.compareKey(word), indexes: [] };
         this.model[lookup.key] = lookup;
      }
      lookup.indexes.push(j);
    }
  },

  ignorable: function(key) {

    if (this.ignorePunctuation && RiTa.isPunctuation(key))
      return true;

    for (var i = 0; i < this.wordsToIgnore.length; i++) {
      var word = this.wordsToIgnore[i];
      if ((this.ignoreCase && key.toUpperCase() === word.toUpperCase()) || key===word)
          return true;
    }
    return false;
  },

  compareKey: function(word) {
    return this.ignoreCase ? word.toLowerCase() : word;
  },

  lookup: function(word) {
    var key = this.compareKey(word);
    if (!this.model) this.build();
    return this.model[key];
  }
};
*/
