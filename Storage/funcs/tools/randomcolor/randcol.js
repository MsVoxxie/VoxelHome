function copyAll(colors) {
	const clicked = document.getElementById('copybtn');
	clicked.innerHTML = 'Copied!';
	setTimeout(() => {
		clicked.innerHTML = 'Copy All';
	}, 1.5 * 1000);
	const endPoint = `${colors.map((c) => `${c}`).join(' ')}`;
	navigator.clipboard.writeText(endPoint);
	return;
}

function copySingle(clk) {
	const clicked = document.getElementById(clk);
	const clkID = clicked.id;
	clicked.innerHTML = `<span class="coltex">Copied</span>`;
	setTimeout(() => {
		clicked.innerHTML = `<span class="coltex">${clkID}</span>`;
	}, 1.5 * 1000);
	const endPoint = clkID;
	navigator.clipboard.writeText(endPoint);
	return;
}

function refreshButton() {
	const clicked = document.getElementById('reloadbtn');
	clicked.innerHTML = 'Generating';
	animate(0.8);
	setTimeout(() => {
		window.location.reload();
	}, 500);
	return;
}

function animate(endVal) {
	const Boxes = document.querySelectorAll('.colbox');
	Boxes.forEach((box, i) => {
		box.style.transitionDelay = `0.${i}s`;
		box.style.transform = `scale(${endVal})`;
	});
}

function getScale(element) {
	return element.style.transform.match(/scale\(([1-9\.])\)/)[1];
}
