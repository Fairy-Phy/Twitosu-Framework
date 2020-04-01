import twitter_config_interface from "../interfaces/twitter_config_interface";

/**
 * Twitter config database data
 */
class twitter_config_entity implements twitter_config_interface {
	osu_server: number;
	osu_name: string;
	osu_mode: number;

	constructor(twitter_config: any) {
		if (twitter_config.osu_server == undefined || twitter_config.osu_server == null) throw new Error("No value: twitter_config.osu_server");
		if (twitter_config.osu_name == undefined || twitter_config.osu_name == null || twitter_config.osu_name == "") throw new Error("No value: twitter_config.osu_name");
		if (twitter_config.osu_mode == undefined || twitter_config.osu_mode == null) throw new Error("No value: twitter_config.osu_mode");

		if (parseInt(twitter_config.osu_server) > 1) throw new Error("Not allow value: twitter_config.osu_server");
		if (parseInt(twitter_config.osu_mode) > 3) throw new Error("Not allow value: twitter_config.osu_mode");

		this.osu_server = parseInt(twitter_config.osu_server);
		this.osu_name = twitter_config.osu_name;
		this.osu_mode = parseInt(twitter_config.osu_mode);
	}
}

export default twitter_config_entity;
