
var events = require('events');
var util = require('util');
var ace = require('brace');
require('brace/theme/monokai');

var Editor = function(lang, selector) {
    if (lang !== 'javascript' && lang !== 'html')
        throw 'Unsupported language';

    require('brace/mode/' + lang);

    this.editor = this.enable(selector, lang);
    this.editor.on('change', this.emit.bind(this, 'change'));
};

Editor.prototype.enable = function(selector, lang) {
    var editor = ace.edit(selector);
    editor.getSession().setMode('ace/mode/' + lang);
    editor.setTheme('ace/theme/monokai');
    editor.setShowPrintMargin(false);
    editor.setOption('scrollPastEnd', false);
    return editor;
};

Editor.prototype.focus = function() {
    this.editor.focus();
};

Editor.prototype.get = function() {
    return this.editor.getValue();
};

util._extend(Editor.prototype, events.EventEmitter.prototype);

module.exports = Editor;
