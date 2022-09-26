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
