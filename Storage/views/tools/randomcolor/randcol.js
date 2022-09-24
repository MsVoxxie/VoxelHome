function copyColors(colors) {
	// Get Clicked
	const clicked = document.getElementById('copybtn');
	// Style
	clicked.innerHTML = 'Copied!';
	setTimeout(() => {
		clicked.innerHTML = 'Copy';
	}, 3 * 1000);
	// Copy stuff
	const endPoint = `${colors.map((c) => `${c}`).join(' ')}`;
	navigator.clipboard.writeText(endPoint);
	return;
}

function copyToClipboard(clk) {
	// Get Clicked
	const clicked = document.getElementById(clk);
	const clkID = clicked.id;
	// Style
	clicked.innerHTML = `<span class="coltex">Copied</span>`;
	setTimeout(() => {
		clicked.innerHTML = `<span class="coltex">${clkID}</span>`;
	}, 3 * 1000);
	// Copy stuff
	const endPoint = clkID;
	navigator.clipboard.writeText(endPoint);
	return;
}
