document.addEventListener('DOMContentLoaded', updatePage);

addEventListener('focus', (event) => {
	const randHello = ['Hello!', 'Howdy!', 'Hey there!', 'Whats up?', 'Doing well?', 'Take it easy!', 'Welcome Home!'];
	document.title = randHello[Math.floor(Math.random() * randHello.length)];
});

addEventListener('blur', (event) => {
	const randBye = ['See ya!', 'Later!', 'Take it easy!', 'Take care!', 'Toodles!', 'Have a good one!', 'Bye bye!'];
	document.title = randBye[Math.floor(Math.random() * randBye.length)];
});

function updatePage() {
	getTime();
	getTimePDT();
	forceFocus();
	updateServerStats();
	setInterval(getTime, 1000);
	setInterval(getTimePDT, 1000);
	setInterval(updateServerStats, 10 * 1000);
	console.log(window.navigator.userLanguage || window.navigator.language);
}

function forceFocus() {
	const autoFocusTarget = document.getElementById('search');
	if (document.activeElement !== autoFocusTarget) {
		autoFocusTarget.focus();
	}
}

function clickAnimate(URL) {
	const Container = document.getElementsByClassName('container')[0];
	// Container.style.transform = 'translate(100);'
	// setTimeout(() => {
	window.location = URL;
	// }, 15);
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

	const SCREENSHOT = document.getElementById('SCREENSHOTS');
	const SCREENSHOTText = document.getElementById('screenshots-title');

	const HOSTNAME = document.getElementById('systemstats');

	// Get Data
	const serverData = await fetchAsync('https://api.voxxie.me/api/system/statistics');
	const screenshotData = await fetchAsync('https://cdn.voxxie.me/count');

	const CPUValue = Math.floor(serverData.CpuUsage);
	const MEMValue = Math.floor(serverData.UsedMem);
	const DISKValue = Math.floor(serverData.DiskUsage);
	const SCREENSHOTFormatter = Intl.NumberFormat('en', { notation: 'compact' });
	const SCREENSHOTValue = SCREENSHOTFormatter.format(screenshotData.total);

	// Apply Data
	CPU.style.width = `${CPUValue}%`;
	CPUText.innerHTML = `CPU: ${CPUValue}%`;

	MEM.style.width = `${MEMValue}%`;
	MEMText.innerHTML = `MEM: ${MEMValue}%`;

	DISK.style.width = `${DISKValue}%`;
	DISKText.innerHTML = `DISK: ${DISKValue}%`;

	SCREENSHOT.style.width = '100%';
	SCREENSHOTText.innerHTML = `Uploads: ${SCREENSHOTValue}`;

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
	var timeZone = new Date().toLocaleString('en-us', { timeZone: 'America/Toronto' });
	var now = new Date(timeZone);

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

function getTimePDT() {
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
	var timeZone = new Date().toLocaleString('en-us', { timeZone: 'America/Los_Angeles' });
	var now = new Date(timeZone);

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

	const CurTime = `PDT Time Is ${hour}:${min}:${sec} ${mid}`;
	const CurDate = `\nToday Is ${wd} ${mm} ${dd}`;
	const clock = document.getElementById('clock-pdt');
	const date = document.getElementById('date-pdt');

	clock.innerHTML = CurTime;
	date.innerHTML = CurDate;
}
