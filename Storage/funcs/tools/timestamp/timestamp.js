(function () {
	console.log('Discord Timestamp Formatter - Sapphire Tools\n' + 'Version 1.0.0 | Released 7/20/2021 8:00 PM \n');

	// Default date
	var now = new Date();
	var offset = now.getTimezoneOffset() * 60000;
	var adjustedDate = new Date(now.getTime() - offset);
	var formattedDate = adjustedDate.toISOString().substring(0, 16); // For minute precision
	var datetimeField = document.getElementById('datetime');
	datetimeField.value = formattedDate;
})();

function Generate() {
	var output = document.getElementById('output');
	var dt = document.getElementById('datetime').value;
	var format = document.getElementById('format').value;
	var utc = new Date(dt).getTime() / 1000;

	document.getElementById('generate').innerHTML = 'Generated';
	setTimeout(() => {
		document.getElementById('generate').innerHTML = 'Generate';
	}, 2 * 1000);

	output.innerHTML = '<t:' + utc + ':' + format + '>';
}

function Copy(elementId) {
	var item = document.getElementById(elementId).innerHTML;
	navigator.clipboard.writeText(item).then(
		function () {
			console.log('Copied to clipboard.');
			document.getElementById('copy').innerHTML = 'Copied!';
			setTimeout(() => {
				document.getElementById('copy').innerHTML = 'Copy';
			}, 2 * 1000);
		},
		function () {
			console.log('Copy to clipboard failed!');
			document.getElementById('copy').innerHTML = 'Failed.';
			setTimeout(() => {
				document.getElementById('copy').innerHTML = 'Copy';
			}, 2 * 1000);
		}
	);
}
