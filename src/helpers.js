module.exports = function (tteditor) {
	return {
		insertButtonsIntoToolbar: function (toolbarItems, toolbarParent) {
			var buttonContainer 		= document.createElement('div');
			buttonContainer.className 	= 'TTEditorToolbarButtonsContainer';
			toolbarItems.forEach(function (item) {
				if (item.type === 'button') {
					var toolbarItem = document.createElement('button');
					toolbarItem.innerHTML = item.content;
					toolbarItem.id 	= item.id;
					toolbarItem.setAttribute('type', item.type);
					Object.keys(item.attributes).forEach(function (attr) {
						toolbarItem.setAttribute(attr, item.attributes[attr]);
					});
					buttonContainer.appendChild(toolbarItem);
				} else if (item.type === 'divider') {
					var dividerItem = document.createElement('span');
					dividerItem.setAttribute('type', item.type);
					dividerItem.setAttribute('class', item.class);
					buttonContainer.appendChild(dividerItem);
				};
			});
			toolbarParent.appendChild(buttonContainer);
		},

		updateToolbarDisplay: function () {
			var quill 			= tteditor.getQuill();
			var helpers 		= tteditor.getHelpers();
			$('button[format_name]').removeClass('editor-active');
			$('button[format_name="align"][format_value=""]').addClass('editor-active');
			$('button[format_name="size"][format_value=""]').addClass('editor-active');
			$('button[format_name="link"]').attr('format_value', '');
			$('button[format_name="indent"]').attr('format_value', '');

			var selectedFormat = helpers.getSelectedFormat();
			var selectedRange  = helpers.getSelection();

			Object.keys(selectedFormat).forEach(function (formatName) {
				if (typeof selectedFormat[formatName] === 'string' || typeof selectedFormat[formatName] === 'number') {
					if (formatName === 'indent' || formatName === 'link') {
						$('button[format_name="' + formatName + '"]').attr('format_value', selectedFormat[formatName]);
					};
					$('button[format_name="' + formatName + '"][format_value="' + selectedFormat[formatName] + '"]').addClass('editor-active');
					if (formatName === 'align' && selectedFormat[formatName]) {
						$('button[format_name="align"][format_value=""]').removeClass('editor-active');
					};
					if (formatName === 'size' && selectedFormat[formatName]) {
						$('button[format_name="size"][format_value=""]').removeClass('editor-active');
					};
					if (formatName === 'link' && selectedFormat[formatName]) {
						$('button[format_name="link"]').attr('format_value', selectedFormat[formatName]);
					};
				} else {
					$('button[format_name="' + formatName + '"]').addClass('editor-active');
				};
			});
		},

		getSelection: function () {
			var selection 	= tteditor.getQuill().getSelection();
			selection 		= selection || {};
			selection.index  = (selection.index != null && selection.index != undefined) ? selection.index : -1;
			selection.length = selection.length || 0;
			return selection;
		},

		getSelectedFormat: function () {
			var selection 	= tteditor.getQuill().getSelection(false);
			selection 		= selection || {};
			var index 		= selection.index || 0;
			var length 		= selection.length || 0;
			if (length) {
				return tteditor.getQuill().getFormat(index, length);
			};
			return tteditor.getQuill().getFormat(index);
		},

		selectedFormatContains: function (formatName) {
			if (!formatName) return false;
			var selectedFormat = this.getSelectedFormat();
			return selectedFormat[formatName] != undefined;
		}
	};
};
