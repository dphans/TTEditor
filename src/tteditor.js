/* load additional modules */
require('./extensions/array.js');
require('./additionals/utils.js');
require('./additionals/constants.js');
var CodeMirror 	= require('codemirror');

var Defines 	= {
	textAreaId: null,
	textAreaDOM: null
};

TTEditor 		= function (elementId) {
	Defines.textAreaId	= elementId;
	return {
		render: function () {
			if (!Defines.textAreaId) return TTEditorUtils.Log(TTEditorConst.Error.ELEMENT_NOT_FOUND);
			Defines.textAreaDOM	= document.getElementById(Defines.textAreaId);
			if (!Defines.textAreaDOM) return TTEditorUtils.Log(TTEditorConst.Error.ELEMENT_NOT_FOUND);
			if (Defines.textAreaDOM.tagName !== 'TEXTAREA') return TTEditorUtils.Log(TTEditorConst.Error.ELEMENT_REQUIRED_TEXTAREA);
			CodeMirror.fromTextArea(Defines.textAreaDOM, {});
		}
	};
};

return TTEditor;
