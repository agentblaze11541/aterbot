import FS from 'fs';

export default class BotLogger {
	constructor(/*types*/logsPath) {
		//this.types = types;
		this.logsPath = logsPath;
		this.logs = FS.readFileSync(this.logsPath, 'utf-8').split('\n');
		this.callback = ()=> {};
	};
	#log(message, type) {
		//if(!this.types.includes(type)) return;
		const msg = message.replace(/\n{2,}/g, '\n').replace(/\s{2,}/g, ' ');
		FS.appendFileSync(this.logsPath, `${msg}\n`, 'utf-8');
		
		this.logs.push(msg);
		this.callback(this.logs);
	}

	log(msg) {
		console.log(msg);
		this.#log(msg);
	};
	warn(msg) {
		console.warn(msg);
		this.#log(msg);
	};
	error(msg) {
		console.error(msg);
		this.#log(msg);
	};
	debug(msg) {
		console.debug(msg);
		this.#log(msg);
	};
	subscribe(callback) {
		this.callback = callback;
		return this.logs;
	};
};