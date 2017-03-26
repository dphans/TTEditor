$(function () {
	editor	= new TTEditor({
		element: 'my-editor',
		autofocus: true
	})
	.on('lineChanged', function (lastLine, lineNumber) {
		console.log('lineChanged: from ' + lastLine + ' to ' + lineNumber);
	})
	.on('cursorChanged', function (lastCur, curCur) {
		console.log('cursorChanged: from ' + JSON.stringify(lastCur) + ' to ' + JSON.stringify(curCur));
	})
	.init();
});
