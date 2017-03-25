/* load additional modules */
var CodeMirror = require('codemirror');

/* app modules */
require('./extensions/array.js');
require('./additionals/utils.js');
require('./additionals/constants.js');
require('./additionals/methods.js');

/* third-party modules */
require("codemirror/addon/mode/overlay.js");
require("codemirror/addon/display/panel.js");
require("codemirror/addon/display/placeholder.js");
require("codemirror/addon/selection/active-line.js");
require("codemirror/addon/selection/mark-selection.js");

require("codemirror/mode/gfm/gfm.js");
require("codemirror/mode/xml/xml.js");

/* values */
var Props 	= {
	/* init properties */
	textAreaId: null,
	textAreaDOM: null,
	userOptions: {},

	/* runtime properties */
	currentLine: -1
};

/* default options */
var Options = {
	default: {
		mode: "text/html",
		tabSize: 4,
		indentWithTabs: false,
		lineWrapping: true,
		lineNumbers: false,
		showCursorWhenSelecting: true,
		styleActiveLine: true
	}
};

/* TTEditor events */
var Events = {

	// lineChanged(lastLine, currentLine), line index begin from 0
	lineChanged: null
};

TTEditor = function (options) {
	Props.userOptions 	= options || {};
	Props.userOptions 	= TTEditorUtils.OverrideArray(Options.default, Props.userOptions);
	Props.textAreaId	= Props.userOptions.element || null;
	return this;
};

var editor 						= null;
TTEditor.prototype 				= {};
TTEditor.prototype.constructor 	= TTEditor;

function handleCodeMirrorEvents() {
	if (!editor.codeMirror) return TTEditorUtils.Log(TTEditorConst.Error.CORE_NOT_DEFINED);
	editor.codeMirror.on('cursorActivity', function (event) {
		var cursorPosition		= editor.codeMirror.getCursor(true);
		if (cursorPosition.line !== Props.currentLine) {
			if (typeof Events.lineChanged === 'function') {
				Events.lineChanged(Props.currentLine, cursorPosition.line);
			}
			Props.currentLine 	= cursorPosition.line;
		}
	});
}

/* init */
TTEditor.prototype.init 		= function () {
	editor				= this;
	if (!Props.textAreaId) return TTEditorUtils.Log(TTEditorConst.Error.ELEMENT_NOT_FOUND);
	Props.textAreaDOM	= document.getElementById(Props.textAreaId);
	if (!Props.textAreaDOM) return TTEditorUtils.Log(TTEditorConst.Error.ELEMENT_NOT_FOUND);
	if (Props.textAreaDOM.tagName !== 'TEXTAREA') return TTEditorUtils.Log(TTEditorConst.Error.ELEMENT_REQUIRED_TEXTAREA);
	this.codeMirror 	= CodeMirror.fromTextArea(Props.textAreaDOM, Props.userOptions);
	handleCodeMirrorEvents();
	return this;
};

/* register TTEditor events. THIS IS OVERRIDE OLDER ONE! */
TTEditor.prototype.on 			= function (eventName, callback) {
	if (Events[eventName] === null || typeof Events[eventName] === 'function') {
		if (typeof callback === 'function') {
			Events[eventName] = callback;
		}
	}
	return this;
};

/* get current line on editor */
TTEditor.prototype.getCurrentLine = function () {
	return Props.currentLine;
};

module.exports = TTEditor;
