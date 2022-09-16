function onLoad() {
	setBackground();
}

function setBackground() {
	const Backgrounds = ['bg-01.jpg', 'bg-02.jpg', 'bg-03.jpg', 'bg-04.jpg', 'bg-05.jpg', 'bg-06.jpg', 'bg-07.jpg', 'bg-08.jpg'];
	const randomBackground = Backgrounds[Math.floor(Math.random() * Backgrounds.length)];
	const DocStyle = document.getElementsByClassName('full-screen-container')[0].style;
	DocStyle.backgroundImage = `url('./assets/imgs/backgrounds/${randomBackground}')`;
	DocStyle.backgroundRepeat = 'no-repeat';
	DocStyle.backgroundAttachment = 'fixed';
	DocStyle.backgroundPosition = 'center center';
}

const observer = new IntersectionObserver((entities) => {
	entities.forEach((ent) => {
		if (ent.isIntersecting) {
			ent.target.classList.add('show');
		} else {
			ent.target.classList.remove('show');
		}
	});
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => {
	observer.observe(el);
});
