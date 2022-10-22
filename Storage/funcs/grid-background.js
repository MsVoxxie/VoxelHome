const wrapper = document.getElementById('tiles');
const tileSize = 50;

let columns = 0,
	rows = 0,
	toggled = false;

const toggle = () => {
	toggled = !toggled;

	document.body.classList.toggle('toggled');
};

const handleOnClick = (index) => {
	toggle();

	anime({
		targets: '.tile',
		opacity: toggled ? 1 : 0,
		delay: anime.stagger(50, {
			grid: [columns, rows],
			from: index,
		}),
	});
};

const createTile = (index) => {
	const tile = document.createElement('div');

	tile.classList.add('tile');

	tile.style.opacity = toggled ? 1 : 0;

	tile.onclick = (e) => handleOnClick(index);

	return tile;
};

const createTiles = (quantity) => {
	Array.from(Array(quantity)).map((tile, index) => {
		wrapper.appendChild(createTile(index));
	});
};

const createGrid = () => {
	wrapper.innerHTML = '';

	// const size = document.body.clientWidth > 800 ? 100 : 50;

	columns = Math.floor(document.body.clientWidth / tileSize);
	rows = Math.floor(document.body.clientHeight / tileSize);

	wrapper.style.setProperty('--columns', columns);
	wrapper.style.setProperty('--rows', rows);

	createTiles(columns * rows);
};

createGrid();

window.onresize = () => createGrid();
