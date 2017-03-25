TTEditorUtils = {

	/* log message on screen, based on DEBUG flag */
	Log: function (message) {
		if (TTEditorConst.Debug.MODE > 0) {
			console.log(message);
		}
	},

	OverrideArray: function (requireObject, optionalObject) {
		var resultObject = requireObject;
		for (var key in optionalObject) {
			resultObject[key] = optionalObject[key];
		}
		return resultObject;
	}

};
