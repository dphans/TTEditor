hljs 				= require('highlight.js');
var Quill 			= require('quill');
var Delta 			= require('quill-delta');
var Constants 		= require('./constraints.js')();
var quill 			= null;
var cursorPosition 	= -1;

TTEditor 	= function (elementId, options) {
	this.options 	= options;
	this.options 	= this.options || Constants.defaultOptions;
	this.elementId 	= elementId + 'Editor';
	
	var baseDiv  	= document.getElementById(elementId);

	var toolbar 	= document.createElement('div');
	toolbar.id 		= elementId + 'Toolbar';
	baseDiv.appendChild(toolbar);
	var contents 	= document.createElement('div');
	var editor  	= document.createElement('div');
	editor.id 	 	= this.elementId;
	contents.appendChild(editor);
	baseDiv.appendChild(contents);

	var fileCtner 	= document.createElement('div');
	var filePicker 	= document.createElement('input');
	filePicker.id 	= elementId + 'InputFileUpload';
	filePicker.type = 'file';
	filePicker.accept 		= 'image/*';
	filePicker.onchange 	= function (event) {
		if (typeof Constants.events.filesSelected === 'function') {
			Constants.events.filesSelected(filePicker.files);
		};
	};
	fileCtner.appendChild(filePicker);
	baseDiv.appendChild(fileCtner);
	
	this.toolbar 	= toolbar;
	this.editor 	= editor;
	baseDiv.className 		= 'TTEditor-Container';
	this.toolbar.className 	= 'TTEditor-Toolbar';
	contents.className 		= 'TTEditor-EditorContent';
	fileCtner.className 	= 'TTEditor-FormInputFile';
	Helpers.insertButtonsIntoToolbar(Constants.toolbarItems, this.toolbar);
	Methods.initToolbarItemsMethods(Constants.toolbarItems);
	this.autosaveId = baseDiv.getAttribute("tektalk-auto-save-unique") || elementId;
	return this;
};

TTEditor.prototype 				= {};
TTEditor.prototype.constructor 	= TTEditor;
TTEditor.prototype.getHelpers 	= function () { return Helpers; };
TTEditor.prototype.getMethods 	= function () { return Methods; };
TTEditor.prototype.getConstants = function () { return Constants; };
TTEditor.prototype.getQuill 	= function () { return quill; };

/* Render on view */
TTEditor.prototype.render 		= function () {

	// config hightlightjs for code syntax
	hljs.configure({
		languages: ['javascript', 'ruby', 'java', 'php', 'objectivec', 'swift']
	});

	// init core library
	quill 			= new Quill(this.editor, { modules: { syntax: true }, placeholder: 'write something...' });

	// handle core library events
	quill.on('editor-change', function (event, data) {
		var newSelectionChanges	= Helpers.getSelection();
		Helpers.updateToolbarDisplay();
	});

	quill.on('text-change', function (delta, oldDelta, source) {
		
	});

	quill.on('selection-change', function (range, oldRange, source) {
		if (range) {
			cursorPosition = range.index;
			if ($('#TektalkPanelLink').attr('shown') && range.length <= 0) {
				$('#TektalkPanelLink').attr('shown', false).hide();
			} else if (range.length > 0 && Helpers.selectedFormatContains('link')) {
				var selection 	= Helpers.getSelection();
				var bounds 		= quill.getBounds(selection);
				var formats 	= Helpers.getSelectedFormat();
				$('#TTEditorInputLink').val(formats['link']);
				$('#TektalkPanelLink').css({
					top: bounds.bottom + 8,
					left: (bounds.left + (bounds.width / 2)) - ($('#TektalkPanelLink').width() / 2)
				}).attr('shown', true).show();
			};
		};
	});

	// handle user press save short key (Cmd + S or Control + S)
	quill.keyboard.addBinding({ key: 'S', metaKey: true }, function (event) {
		
	});

	// remove formatting when user paste contents from other source
	quill.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {

		// user paste youtube link
		var youtubeIdRegex 	= /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var matchYtId 		= $(node).text().match(youtubeIdRegex);
		var youtubeId  		=  (matchYtId && matchYtId[7].length == 11 ) ? matchYtId[7] : null;
		if (youtubeId) {
			return new Delta([
				{
					insert: { video: 'https://www.youtube.com/embed/' + youtubeId },
					attributes: { align: 'center' }
				}
			]);
		};

		// user paste image link
		var imageURLRegex	= /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/;
		var matchImageURL 	= $(node).text().match(imageURLRegex);
		if (matchImageURL && matchImageURL[0]) {
			return new Delta([{
				insert: { image: matchImageURL[0] },
				attributes: { align: 'center' }
			}, {
				insert: '\n',
				attributes: { align: 'center' }
			}]);
		};

		return new Delta().insert(node.data);
	});

	quill.clipboard.addMatcher(Node.ELEMENT_NODE, function(node, delta) {
		return new Delta().insert($(node).text());
	});

	// add link dialog
	var linkCtner 	= document.createElement('div');
	linkCtner.style.display = 'none';
	linkCtner.id 	= 'TektalkPanelLink';
	linkCtner.className 	= 'TTEditor-Panel TTEditor-Card-Default TTEditor-Arrow-Bottom';
	var linkInput 	= document.createElement('input');
	linkInput.id 	= 'TTEditorInputLink';
	linkInput.type 	= 'text';
	linkInput.className 	= 'TTEditor-FormInput';
	linkCtner.appendChild(linkInput);
	var linkBtns 	= document.createElement('div');
	linkBtns.align 	= 'right';
	linkBtns.style.marginRight = '-20px';
	var linkCancel	= document.createElement('button');
	linkCancel.type = 'button';
	linkCancel.className 	= 'TTEditor-Button TTEditor-Button-Cancel';
	linkCancel.innerText 	= 'Cancel';
	linkCancel.onclick 		= function (event) { $('#TektalkPanelLink').attr('shown', false).hide(); };
	linkBtns.appendChild(linkCancel);
	var linkUpdate	= document.createElement('button');
	linkUpdate.type = 'button';
	linkUpdate.className 	= 'TTEditor-Button TTEditor-Button-Primary';
	linkUpdate.innerText 	= 'Update';
	linkUpdate.onclick 	= function (event) { Methods.checkAndInsertLink($('#TTEditorInputLink').val()); };
	linkInput.onkeyup 	= function (event) { if (event.keyCode === 13) { Methods.checkAndInsertLink($('#TTEditorInputLink').val()); }; };
	linkBtns.appendChild(linkUpdate);
	linkCtner.appendChild(linkBtns);
	this.editor.appendChild(linkCtner);

	return this;
};

TTEditor.prototype.insertPhotoURL = function (url) {
	quill.insertEmbed(cursorPosition, 'image', url);
};

/* Register listeners */
TTEditor.prototype.on 			= function (eventName, eventCallback) {
	if (typeof eventName === 'string' && typeof eventCallback === 'function') {
		if (typeof Constants.events[eventName] === 'function') {
			Constants.events[eventName] = eventCallback;
		};
	};
};

/* Import */
TTEditor.prototype.import 	= function (ops) {
	if (typeof ops !== 'object') return;
	quill.setContents(ops);
};

/* Export */
TTEditor.prototype.export 	= function () {
	var contents 	= quill.getContents();
	return contents.ops;
};

var Helpers 		= require('./helpers.js')(TTEditor.prototype);
var Methods 		= require('./methods.js')(TTEditor.prototype);
