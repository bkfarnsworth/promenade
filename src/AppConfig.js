
class AppConfig {

	get socket() {
		return _.get(window, 'bfAppConfig.socket');
	}

	set socket(val) {
		_.set(window, 'bfAppConfig.socket', val);
	}

}

export default new AppConfig();