function setBackground() {
	const Backgrounds = ['bg-01.jpg', 'bg-02.jpg', 'bg-03.jpg', 'bg-04.jpg', 'bg-05.jpg', 'bg-06.jpg', 'bg-07.jpg', 'bg-08.jpg', 'bg-09.jpg'];
	const randomBackground = Backgrounds[Math.floor(Math.random() * Backgrounds.length)];
	const DocStyle = document.getElementsByClassName('full-screen-container')[0].style;
	DocStyle.backgroundImage = `url('./assets/imgs/backgrounds/${randomBackground}')`;
	DocStyle.backgroundRepeat = 'no-repeat';
	DocStyle.backgroundAttachment = 'fixed';
	DocStyle.backgroundPosition = 'center center';
}
