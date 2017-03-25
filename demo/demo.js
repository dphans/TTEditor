$(function () {
	editor	= new TTEditor({
		element: 'my-editor'
	})
	.on('lineChanged', function (lastLine, lineNumber) {
		console.log('lineChanged: from ' + lastLine + ' to ' + lineNumber);
	})
	.init();
});
