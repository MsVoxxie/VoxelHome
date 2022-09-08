function updatePage() {
	getTime();
	setBackground();
	updateServerStats();
	setInterval(getTime, 1000);
	setInterval(updateServerStats, 15 * 1000);
}

addEventListener('focus', (event) => {
	const randHello = ['Hello!', 'Howdy!', 'Hey there!', 'Whats up?', 'Doing well?', 'Take it easy!', 'Welcome Home!'];
	document.title = randHello[Math.floor(Math.random() * randHello.length)];
});

addEventListener('blur', (event) => {
	const randBye = ['See ya!', 'Later!', 'Take it easy!', 'Take care!', 'Toodles!', 'Have a good one!', 'Bye bye!'];
	document.title = randBye[Math.floor(Math.random() * randBye.length)];
});

function setBackground() {
	const Backgrounds = ['bg-01.jpg', 'bg-02.jpg', 'bg-03.jpg', 'bg-04.jpg', 'bg-05.jpg', 'bg-06.jpg', 'bg-07.jpg', 'bg-08.jpg', 'bg-09.jpg'];
	const randomBackground = Backgrounds[Math.floor(Math.random() * Backgrounds.length)];
	const DocStyle = document.getElementsByClassName('full-screen-container')[0].style;
	DocStyle.backgroundImage = `url('./assets/imgs/backgrounds/${randomBackground}')`;
	DocStyle.backgroundRepeat = 'no-repeat';
	DocStyle.backgroundAttachment = 'fixed';
	DocStyle.backgroundPosition = 'center center';
}

async function fetchAsync(url) {
	let response = await fetch(url);
	let data = await response.json();
	return data;
}

async function updateServerStats() {
	// Selectors
	const CPU = document.getElementById('CPU');
	const CPUText = document.getElementById('cpu-title');

	const MEM = document.getElementById('MEM');
	const MEMText = document.getElementById('mem-title');

	const DISK = document.getElementById('DISK');
	const DISKText = document.getElementById('disk-title');

	const HOSTNAME = document.getElementById('systemstats');

	// Get Data
	const serverData = await fetchAsync('https://api.voxxie.me/api/system/statistics');

	const CPUValue = Math.floor(serverData.CpuUsage);
	const MEMValue = Math.floor(serverData.UsedMem);
	const DISKValue = Math.floor(serverData.DiskUsage);

	// Apply Data
	CPU.style.width = `${CPUValue}%`;
	CPUText.innerHTML = `CPU: ${CPUValue}%`;

	MEM.style.width = `${MEMValue}%`;
	MEMText.innerHTML = `MEM: ${MEMValue}%`;

	DISK.style.width = `${DISKValue}%`;
	DISKText.innerHTML = `DISK: ${DISKValue}%`;

	HOSTNAME.innerHTML = `${serverData.Hostname.toUpperCase()}`;
}

function getTime() {
	function daySuffix(i) {
		var j = i % 10,
			k = i % 100;
		if (j == 1 && k != 11) {
			return i + 'st';
		}
		if (j == 2 && k != 12) {
			return i + 'nd';
		}
		if (j == 3 && k != 13) {
			return i + 'rd';
		}
		return i + 'th';
	}

	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var now = new Date();

	//Date
	var wd = days[now.getDay()];
	var dd = daySuffix(now.getDate());
	var mm = now.getMonth() + 1;
	mm = months[mm - 1];

	//24h
	var TwentyFourHour = now.getHours();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	if (hour.toString().length < 2) hour = '0' + hour;
	if (sec.toString().length < 2) sec = '0' + sec;

	var mid = 'PM';
	if (min < 10) {
		min = '0' + min;
	}
	if (hour > 12) {
		hour = hour - 12;
	}
	if (hour == 0) {
		hour = 12;
	}
	if (TwentyFourHour < 12) {
		mid = 'AM';
	}

	const CurTime = `The Time Is ${hour}:${min}:${sec} ${mid}`;
	const CurDate = `\nToday Is ${wd} ${mm} ${dd}`;
	const clock = document.getElementById('clock');
	const date = document.getElementById('date');

	clock.innerHTML = CurTime;
	date.innerHTML = CurDate;
}
