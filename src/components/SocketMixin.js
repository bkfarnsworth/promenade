import AppConfig from './../AppConfig';

let SocketMixin = {

	get socket() {
		return AppConfig.socket;
	},

	callOffFuncs() {
		this.offFuncs.forEach(f => f());
		this.offFuncs = [];
	},

	onSocketEvent(event, func) {
		this.socket.on(event, func);
		this.offFuncs = this.offFuncs || [];
		this.offFuncs.push(this.socket.off.bind(this.socket, event, func));
	}

}

export default SocketMixin;