const { APILogin } = require('../../funcs/util');
const router = require('express').Router();
const path = require('path');

router.get('/', async (req, res) => {
	const SERVERS = path.join(__dirname, '../../views/servers.ejs');
	// API Calls
	const Servers = [];
	const API = await APILogin();
	const allInstances = await API.ADSModule.GetInstancesAsync();
	const Sysinfo = await API.ADSModule.GetTargetInfoAsync();
	const FriendlyName = allInstances[0].FriendlyName;
	allInstances[0].AvailableInstances.map((inst) => {
		if (inst.Module === 'ADS') return;
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
	Servers.sort((a, b) => b.Running - a.Running);
	res.render(SERVERS, { Instances: Servers, Sysinfo, FriendlyName });
});

module.exports = router;
