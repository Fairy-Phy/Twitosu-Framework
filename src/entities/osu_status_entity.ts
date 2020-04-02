import osu_status_interface from '../interfaces/osu_status_interface';
import osu_api_entity from './osu_api_entity';
import twitter_config_entity from './twitter_config_entity';

/**
 * Osu! player status data
 */
class osu_status_entity extends osu_api_entity implements osu_status_interface {
	mode: number;
	server: number;
	
	constructor(osu_status: any);
	constructor(osu_status: osu_api_entity, twitter_config: twitter_config_entity);
	constructor(osu_status: any | osu_api_entity, twitter_config?: twitter_config_entity) {
		super(osu_status);

		if (twitter_config == undefined) {
			// if not exist import DB data
			if (osu_status.server == null || osu_status.server == undefined) this.server = 0;
			else if (parseInt(osu_status.server, 10) > 1 || parseInt(osu_status.server, 10) < 0 || isNaN(parseInt(osu_status.server, 10))) this.server = 0;
			else this.server = parseInt(osu_status.server, 10);

			if (osu_status.mode == null || osu_status.mode == undefined) this.mode = 0;
			else if (parseInt(osu_status.mode, 10) > 3 || parseInt(osu_status.mode, 10) < 0 || isNaN(parseInt(osu_status.mode, 10))) this.mode = 0;
			else this.mode = parseInt(osu_status.mode, 10);
		}
		else {
			this.mode = twitter_config.osu_mode;
			this.server = twitter_config.osu_server;
		}
	}
}

export default osu_status_entity;