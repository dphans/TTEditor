module.exports 	= function (tteditor) {
	
	var Helpers = tteditor.getHelpers();

	return {
		initToolbarItemsMethods: function (toolbarItems) {
			var Methods	= this;
			toolbarItems.forEach(function (item) {
				if (item.type === 'button') {
					if (item.attributes.format_Type === 'define') {
						document.getElementById(item.id).onclick = Methods.formatDefineValue.bind(this, document.getElementById(item.id));
					} else if (item.attributes.format_Type === 'toggle') {
						document.getElementById(item.id).onclick = Methods.formatToggleValue.bind(this, document.getElementById(item.id));
					} else if (item.attributes.format_Type === 'switch') {
						document.getElementById(item.id).onclick = Methods.formatSwitchValue.bind(this, document.getElementById(item.id));
					} else if (item.attributes.format_Type === 'action') {
						if (typeof Methods.customActions[item.attributes.format_Action] === 'function') {
							document.getElementById(item.id).onclick = Methods.customActions[item.attributes.format_Action].bind(this, document.getElementById(item.id));
						};
					};
				};
			});
		},

		getContentsJSON: function () {
			if (!tteditor.getQuill()) return "";
			var contents 	= tteditor.getQuill().getContents();
			var resultJSON 	= [];
			contents.eachLine(function (line, attributes, i) {
				var phrase 	= {
					contents: [],
					attrName: (Object.keys(attributes).length > 0) ? Object.keys(attributes)[0] : null,
					attrValue: (Object.keys(attributes).length > 0) ? attributes[Object.keys(attributes)[0]] : null
				};
				line.forEach(function (text) {
					phrase.contents.push({
						text: text.insert,
						attributes: text.attributes || {}
					});
				});
				resultJSON.push(phrase);
			});
			return resultJSON;
		},

		formatToggleValue: function (sender) {
			var formatName = sender.getAttribute('format_name');
			if (!formatName) return;
			tteditor.getQuill().format(formatName, !tteditor.getHelpers().selectedFormatContains(formatName), 'api');
			tteditor.getHelpers().updateToolbarDisplay();
		},

		formatDefineValue: function (sender) {
			var formatName 	= sender.getAttribute('format_name');
			var formatValue = sender.getAttribute('format_value');
			formatValue 	= formatValue || '';
			if (!formatName) return;
			tteditor.getQuill().format(formatName, formatValue, 'api');
			tteditor.getHelpers().updateToolbarDisplay();
		},

		formatSwitchValue: function (sender) {
			var formatName 	= sender.getAttribute('format_name');
			var formatValue = sender.getAttribute('format_value');
			var avaisFormat	= sender.getAttribute('format_available_values');
			var direction	= sender.getAttribute('format_switch_direction');
			formatValue 	= formatValue || '';
			avaisFormat 	= avaisFormat || [];
			avaisFormat 	= avaisFormat.split(',');
			direction 		= direction || 'next';
			if (!formatName || avaisFormat.length == 0 || !direction) return;
			var indexCurnt	= avaisFormat.indexOf(formatValue);
			var isNextSlt	= direction === 'next';
			if (isNextSlt) {
				formatValue = (indexCurnt < 0) ? avaisFormat[0] : ((indexCurnt + 1) < avaisFormat.length ? avaisFormat[indexCurnt + 1] : '');
			} else {
				formatValue = (indexCurnt < 0) ? avaisFormat[avaisFormat.length - 1] : ((indexCurnt - 1) >= 0 ? avaisFormat[indexCurnt - 1] : '');
			};
			tteditor.getQuill().format(formatName, formatValue, 'api');
			tteditor.getHelpers().updateToolbarDisplay();
		},

		checkAndInsertLink: function (linkURL) {
			if (!linkURL) {
				tteditor.getQuill().format('link', '');
				Helpers.hideURLPanel();
				return;
			};
			if (linkURL.indexOf('http') == -1) { linkURL = 'http://' + linkURL; };
			var validLink 	= /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
			if (!linkURL.match(validLink)) { return Helpers.hideURLPanel(); };
			tteditor.getQuill().format('link', linkURL);
			Helpers.hideURLPanel();
		},

		customActions: {
			uploadFile: function (sender) {
				$('#TektalkMainEditorInputFileUpload').trigger('click');
			},

			editLink: function (sender) {
				var selection = Helpers.getSelection();
				if (selection.length > 0) {
					var bounds 	= tteditor.getQuill().getBounds(selection);
					if (!Helpers.selectedFormatContains('link')) {
						$('#TTEditorInputLink').val('');
					} else {
						var formats = Helpers.getSelectedFormat();
						$('#TTEditorInputLink').val(formats['link']);
					};
					$('#TektalkPanelLink').css({
						top: bounds.bottom + 8,
						left: (bounds.left + (bounds.width / 2)) - ($('#TektalkPanelLink').width() / 2)
					}).attr('shown', true).show();
					$('#TTEditorInputLink').focus();
				};
			}
		}

	};
};
