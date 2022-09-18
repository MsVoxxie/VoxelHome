const { APILogin } = require('../../funcs/util');
const helpers = require('../../funcs/helpers');
const router = require('express').Router();
const path = require('path');

router.get('/', helpers.checkAuthenticated, async (req, res) => {
	const ESERVERS = path.join(__dirname, '../../views/eservers.ejs');
	// API Calls
	const Servers = [];
	const API = await APILogin();
	const allInstances = await API.ADSModule.GetInstancesAsync();
	allInstances[0].AvailableInstances.map((inst) => {
		Servers.push({
			FriendlyName: inst.FriendlyName,
			InternalName: inst.InstanceName,
			Module: inst.Module == 'GenericModule' ? 'Custom' : inst.Module == 'srcds' ? 'Source' : inst.Module,
			Running: inst.Running,
			Metrics: {
				CPUPer: inst?.Metrics?.['CPU Usage']?.Percent ? inst.Metrics['CPU Usage'].Percent : 0,
				CPUUsed: inst?.Metrics?.['CPU Usage']?.MaxValue ? `${inst.Metrics['CPU Usage'].RawValue} / ${inst.Metrics['CPU Usage'].MaxValue}` : '0',

				MemPer: inst?.Metrics?.['Memory Usage']?.Percent ? inst.Metrics['Memory Usage'].Percent : 0,
				MemUsed: inst?.Metrics?.['Memory Usage']?.MaxValue ? `${inst.Metrics['Memory Usage'].RawValue} / ${inst.Metrics['Memory Usage'].MaxValue}` : '0',

				UsersPer: inst?.Metrics?.['Active Users']?.Percent ? inst.Metrics['Active Users'].Percent : 0,
				UsersTotal: inst?.Metrics?.['Active Users']?.MaxValue ? `${inst.Metrics['Active Users'].RawValue} / ${inst.Metrics['Active Users'].MaxValue}` : '0 / 0',
			},
		});
	});

	//Start, Stop, Restart Functions
	async function stopServer(id) {
		const API = await APILogin();
		await API.ADSModule.StopInstanceAsync(id);
	}

	async function startServer(id) {
		const API = await APILogin();
		await API.ADSModule.StartInstanceAsync(id);
	}

	async function restartServer(id) {
		const API = await APILogin();
		await API.ADSModule.RestartInstanceAsync(id);
	}

	Servers.sort((a, b) => b.Running - a.Running);
	res.render(ESERVERS, { Instances: Servers });
});

module.exports = router;
