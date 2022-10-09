const circleProgress = document.querySelector('.circle-bar');
const circleValue = document.querySelector('.circle-value');

console.log(circleProgress.style)

let startValue = 0;
const endValue = 90;
const speed = 5;

const progress = setInterval(() => {
	startValue++;
	circleValue.textContent = `${startValue}%`;
	circleProgress.style.background = `conic-gradient(#7d2ae8 ${startValue * 3.6}deg, #ededed 0deg)`

	if (startValue == endValue) {
		clearInterval(progress);
	}
}, speed);
