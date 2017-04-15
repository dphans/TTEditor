module.exports = function () {
	return {
		defaultOptions: {
			autoSave: false,
			autoSaveDuration: 5000,
			autoSaveId: 'TTEditorAutoSave'
		},
		toolbarItems: [
			{
				id: 'TTEditorFormatTitle',
				type: 'button',
				content: '<strong style="display: inline-block; font-family: Georgia,serif;">Tt</strong>',
				attributes: {
					title: 'Title',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'header',
					format_Value: '1'
				}
			},
			{
				id: 'TTEditorFormatSection',
				type: 'button',
				content: '<strong style="display: inline-block; font-family: Georgia,serif;">h1</strong>',
				attributes: {
					title: 'Section',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'header',
					format_Value: '2'
				}
			},
			{
				id: 'TTEditorFormatSubsection',
				type: 'button',
				content: '<strong style="display: inline-block; font-family: Georgia,serif;">h2</strong>',
				attributes: {
					title: 'Subsection',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'header',
					format_Value: '3'
				}
			},
			{
				id: 'TTEditorFormatBody',
				type: 'button',
				content: '<span style="display: inline-block; font-family: Georgia,serif;">bd</span>',
				attributes: {
					title: 'Body',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'header',
					format_Value: ''
				}
			},
			{ type: 'divider', class: 'TTEditorToolbarDivider' },
			{
				id: 'TTEditorFormatBold',
				type: 'button',
				content: '<i class="fa fa-bold"/>',
				attributes: {
					title: 'Bold',
					class: 'TTEditorFormatButton',
					format_Type: 'toggle',
					format_Name: 'bold',
					format_Value: ''
				}
			},
			{
				id: 'TTEditorFormatItalic',
				type: 'button',
				content: '<i class="fa fa-italic"/>',
				attributes: {
					title: 'Italic',
					class: 'TTEditorFormatButton',
					format_Type: 'toggle',
					format_Name: 'italic',
					format_Value: ''
				}
			},
			{
				id: 'TTEditorFormatUnderline',
				type: 'button',
				content: '<i class="fa fa-underline"/>',
				attributes: {
					title: 'Underline',
					class: 'TTEditorFormatButton',
					format_Type: 'toggle',
					format_Name: 'underline',
					format_Value: ''
				}
			},
			{
				id: 'TTEditorFormatStrikethrough',
				type: 'button',
				content: '<i class="fa fa-strikethrough"/>',
				attributes: {
					title: 'Strikethrough',
					class: 'TTEditorFormatButton',
					format_Type: 'toggle',
					format_Name: 'strike',
					format_Value: ''
				}
			},
			{
				id: 'TTEditorFormatMonospace',
				type: 'button',
				content: '<i class="fa fa-code"/>',
				attributes: {
					title: 'Monospace',
					class: 'TTEditorFormatButton',
					format_Type: 'toggle',
					format_Name: 'code',
					format_Value: ''
				}
			},
			{ type: 'divider' },
			{
				id: 'TTEditorFormatSizeSmall',
				type: 'button',
				content: '<span style="display: inline-block; font-family: &quot;Georgia&quot;, serif; font-size: 16px;">a</span>',
				attributes: {
					title: 'Small text',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'size',
					format_Value: 'small'
				}
			},
			{
				id: 'TTEditorFormatSizeNormal',
				type: 'button',
				content: '<span style="display: inline-block; font-family: &quot;Georgia&quot;, serif; font-size: 21px;">a</span>',
				attributes: {
					title: 'Normal text',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'size',
					format_Value: ''
				}
			},
			{
				id: 'TTEditorFormatSizeLarge',
				type: 'button',
				content: '<span style="display: inline-block; font-family: &quot;Georgia&quot;, serif; font-size: 24px;">a</span>',
				attributes: {
					title: 'Large text',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'size',
					format_Value: 'large'
				}
			},
			{ type: 'divider' },
			{
				id: 'TTEditorFormatAlignLeft',
				type: 'button',
				content: '<i class="fa fa-align-left"/>',
				attributes: {
					title: 'Align left',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'align',
					format_Value: ''
				}
			},
			{
				id: 'TTEditorFormatAlignCenter',
				type: 'button',
				content: '<i class="fa fa-align-center"/>',
				attributes: {
					title: 'Align center',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'align',
					format_Value: 'center'
				}
			},
			{
				id: 'TTEditorFormatAlignRight',
				type: 'button',
				content: '<i class="fa fa-align-right"/>',
				attributes: {
					title: 'Align right',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'align',
					format_Value: 'right'
				}
			},
			{ type: 'divider' },
			{
				id: 'TTEditorFormatIndent',
				type: 'button',
				content: '<i class="fa fa-indent"/>',
				attributes: {
					title: 'Indent',
					class: 'TTEditorFormatButton',
					format_Type: 'switch',
					format_Switch_Direction: 'next',
					format_Name: 'indent',
					format_Available_Values: ["1", "2", "3", "4"]
				}
			},
			{
				id: 'TTEditorFormatListOrdered',
				type: 'button',
				content: '<i class="fa fa-list-ol"/>',
				attributes: {
					title: 'Ordered list',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'list',
					format_Value: 'ordered'
				}
			},
			{
				id: 'TTEditorFormatListBullet',
				type: 'button',
				content: '<i class="fa fa-list-ul"/>',
				attributes: {
					title: 'Bullet list',
					class: 'TTEditorFormatButton',
					format_Type: 'define',
					format_Name: 'list',
					format_Value: 'bullet'
				}
			},
			{ type: 'divider' },
			{
				id: 'TTEditorFormatInsertLink',
				type: 'button',
				content: '<i class="fa fa-link"/>',
				attributes: {
					title: 'Link',
					class: 'TTEditorFormatButton',
					format_Type: 'action',
					format_Action: 'editLink',
					format_Name: 'link'
				}
			},
			{
				id: 'TTEditorFormatUpload',
				type: 'button',
				content: '<i class="fa fa-upload"/>',
				attributes: {
					title: 'Upload',
					class: 'TTEditorFormatButton',
					format_Type: 'action',
					format_Action: 'uploadFile'
				}
			},
			{
				id: 'TTEditorFormatBlockquotes',
				type: 'button',
				content: '<i class="fa fa-quote-right"/>',
				attributes: {
					title: 'Blockquotes',
					class: 'TTEditorFormatButton',
					format_Type: 'toggle',
					format_Name: 'blockquote'
				}
			},
			{
				id: 'TTEditorFormatCodeBlock',
				type: 'button',
				content: '<i class="fa fa fa-file-code-o"/>',
				attributes: {
					title: 'Code Snippet',
					class: 'TTEditorFormatButton',
					format_Type: 'toggle',
					format_Name: 'code-block'
				}
			}
		],
		events: {
			localSave: function() {},
			filesSelected: function (files) {}
		}
	}
};