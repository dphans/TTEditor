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
	ttOptions: {},

	/* runtime properties */
	currentLine: -1,
	currentChar: -1
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
	},
	override: {
		autofocus: false
	},
	ttOptions: {
		autoFocus: true,
		insertButton: true
	}
};

/* TTEditor events */
var Events = {

	/**
	 * lineChanged(lastLine: Int, currentLine: Int)
	 * call when user move cursor on editor between lines
	 * first time: lastLine = -1
	 */
	lineChanged: null,

	/**
	 * cursorChanged(lastPos: { line: Int, char: Int }, currenPos: { line: Int, char: Int })
	 * call when user move cursor on editor between lines
	 * first time: lastPos.line = -1, lastPost.char = -1
	 */
	cursorChanged: null
};

TTEditor = function (options, optionals) {
	Props.userOptions 	= options || {};
	optionals 			= optionals || {};
	Props.ttOptions 	= TTEditorUtils.OverrideArray(Options.ttOptions, optionals);
	Props.userOptions 	= TTEditorUtils.OverrideArray(Options.default, Props.userOptions);
	Props.userOptions 	= TTEditorUtils.OverrideArray(Props.userOptions, Options.override);
	Props.textAreaId	= Props.userOptions.element || null;
	return this;
};

var editor 						= null;
TTEditor.prototype 				= {};
TTEditor.prototype.constructor 	= TTEditor;

function refreshLeftInsertionButton() {
	$('#' + TTEditorDefines.TOOLBAR.INSERTION.CONTENT.ID).css('top', editor.getCurrentLineHeight());
	if (editor.getCurrentLineText() !== '') {
		$('#' + TTEditorDefines.TOOLBAR.INSERTION.CONTENT.ID).hide();
	} else {
		$('#' + TTEditorDefines.TOOLBAR.INSERTION.CONTENT.ID).show();
	}
}

/* handle core events, binding events */
function handleCodeMirrorEvents() {
	if (!editor.codeMirror) return TTEditorUtils.Log(TTEditorConst.Error.CORE_NOT_DEFINED);
	editor.codeMirror.on('cursorActivity', function (event) {
		var cursorPosition		= editor.codeMirror.getCursor(true);

		/* handle cursor changed */
		if (cursorPosition.ch !== Props.currentChar || cursorPosition.line !== Props.currentLine) {
			refreshLeftInsertionButton();
			if (typeof Events.cursorChanged === 'function') {
				Events.cursorChanged({
					line: Props.currentLine,
					char: Props.currentChar
				}, {
					line: cursorPosition.line,
					char: cursorPosition.ch
				});
			}
			Props.currentChar 	= cursorPosition.ch;
		}

		/* handle line changed */
		if (cursorPosition.line !== Props.currentLine) {
			if (typeof Events.lineChanged === 'function') {
				Events.lineChanged(Props.currentLine, cursorPosition.line);
			}
			Props.currentLine 	= cursorPosition.line;
		}
	});

	editor.codeMirror.on('focus', function (event) {
		refreshLeftInsertionButton();
	});
}

/* init */
TTEditor.prototype.init 		= function () {
	editor				= this;

	/* collect components */
	if (!Props.textAreaId) return TTEditorUtils.Log(TTEditorConst.Error.ELEMENT_NOT_FOUND);
	Props.textAreaDOM	= document.getElementById(Props.textAreaId);
	if (!Props.textAreaDOM) return TTEditorUtils.Log(TTEditorConst.Error.ELEMENT_NOT_FOUND);
	if (Props.textAreaDOM.tagName !== 'TEXTAREA') return TTEditorUtils.Log(TTEditorConst.Error.ELEMENT_REQUIRED_TEXTAREA);
	this.codeMirror 	= CodeMirror.fromTextArea(Props.textAreaDOM, Props.userOptions);
	
	/* add panels */
	var panelDOM 		= TTEditorMethods.generateInsertionPanel();
	this.codeMirror.addPanel(panelDOM, { position: 'top', stable: true });
	$('.TTEditor-Panel-Insertion-Container').parent().addClass('TTEditor');
	if (!Props.ttOptions.insertButton) {
		$('.TTEditor-Panel-Insertion-Container').css('display', 'none');
	}
	
	/* listen core events */
	handleCodeMirrorEvents();
	if (Props.ttOptions.autoFocus) {
		editor.codeMirror.focus();
	}
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

TTEditor.prototype.getCurrentLineHeight = function () {
	return this.codeMirror.heightAtLine(this.codeMirror.getCursor(true).line);
};

TTEditor.prototype.getCurrentLineText = function () {
	return this.codeMirror.getLine(this.codeMirror.getCursor(true).line);
};

module.exports = TTEditor;
